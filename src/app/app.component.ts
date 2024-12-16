import { Component } from '@angular/core';
import {ListCheckElemsComponent} from './components/list-check-elems/list-check-elems.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    ListCheckElemsComponent
  ],
  standalone: true
})
export class AppComponent {
}
