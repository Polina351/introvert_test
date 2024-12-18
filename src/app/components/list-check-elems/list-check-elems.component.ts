import {ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, signal} from '@angular/core';
import { DataService } from '../../services/data.service';
import {NgClass, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {ListOfStagesComponent} from '../list-of-stages/list-of-stages.component';

@Component({
  selector: 'app-list-check-elems',
  imports: [
    NgIf,
    ListOfStagesComponent,
    NgClass,
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

  checkboxState = signal<'checked' | 'indeterminate' >('indeterminate');

  constructor(protected data: DataService, private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.data.isMenuOpen()) {
      this.data.isMenuOpen.set(false);
    }
  }

  onButtonClick() {
    if (!this.data.isMenuOpen()) {
      this.data.toggleMenu();
    } else {
      if (this.data.isAllUnchecked()) {
        this.data.selectAll();
        this.checkboxState.set('indeterminate')
      } else {
        this.data.deselectAll();
        this.checkboxState.set('checked');
      }
    }
  }
}
