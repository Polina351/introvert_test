import {ChangeDetectionStrategy, Component, ElementRef, Input, input} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-list-of-stages',
  imports: [],
  templateUrl: './list-of-stages.component.html',
  styleUrl: './list-of-stages.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOfStagesComponent {
  // @ts-ignore
  @Input() funnels!: any;
  @Input() stateName!: string;


  constructor(protected data: DataService) {}

  onCheckBoxChange(list: string, key: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.data.updateCheckboxState(list, key, checkbox.checked);
  }
}
