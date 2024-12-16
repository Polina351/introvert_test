import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-list-check-elems',
  imports: [],
  templateUrl: './list-check-elems.component.html',
  styleUrl: './list-check-elems.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCheckElemsComponent {

  constructor(protected data: DataService) {}

  onCheckBoxChange(list: string, key: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.data.updateCheckboxState(list, key, checkbox.checked);
  }
}
