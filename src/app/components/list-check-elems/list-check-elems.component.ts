import { ChangeDetectionStrategy, Component, computed, ElementRef, HostListener } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgIf } from '@angular/common';
import {ListOfStagesComponent} from '../list-of-stages/list-of-stages.component';
import {funnels} from '../../enums/enums';

@Component({
  selector: 'app-list-check-elems',
  imports: [
    NgIf,
    ListOfStagesComponent
  ],
  templateUrl: './list-check-elems.component.html',
  styleUrl: './list-check-elems.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCheckElemsComponent {

  buttonText$ = computed(() =>
    `${this.data.getPluralForm(this.data.funnelsCount(), [
      'воронка',
      'воронки',
      'воронок',
    ])}, ${this.data.getPluralForm(this.data.stagesCount(), [
      'этап',
      'этапа',
      'этапов',
    ])}`
  );

  constructor(protected data: DataService, private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.data.isMenuOpen()) {
      this.data.isMenuOpen.set(false);
    }
  }

  onCheckBoxChange(list: string, key: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.data.updateCheckboxState(list, key, checkbox.checked);
  }

  onButtonClick() {
    if (!this.data.isMenuOpen()) {
      this.data.toggleMenu();
    } else {
      if (this.data.isAllUnchecked()) {
        this.data.selectAll();
      } else {
        this.data.deselectAll();
      }
    }
  }

  protected readonly funnels = funnels;
}
