import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appHighlightMenu]'
})
export class HighlightMenuDirective implements OnChanges {

  @Input('appHighlightMenu') highlightKey!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.applyHighlight();
  }

  private applyHighlight(): void {
    let backgroundColor = '';

    switch (this.highlightKey) {
      case 'notProcessed':
        backgroundColor = '#99CCFD';
        break;
      case 'negotiations':
        backgroundColor = '#FFFF99';
        break;
      case 'decisionPending':
        backgroundColor = '#FFCC66';
        break;
      case 'successful':
        backgroundColor = '#CCFF66';
        break;
      default:
        backgroundColor = '#f5f5f5';
        break;
    }

    this.renderer.setStyle(this.el.nativeElement, 'background-color', backgroundColor);
  }
}
