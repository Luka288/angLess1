import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightUrgent]',
  standalone: true,
})
export class HighlightUrgentDirective {
  @Input({ alias: 'appHighlightUrgent' }) highlight!: Date;
  @Input({ alias: 'checkTask' }) checkIfComplated: 'complated' | 'pending' =
    'pending';

  currDate: Date = new Date();
  parseDate: Date = new Date();

  constructor(private render: Renderer2, private element: ElementRef) {}

  ngOnInit(): void {
    const parseDate = new Date(this.highlight);

    const calcDates = parseDate.getTime() - this.currDate.getTime();

    const calcHour = 24 * 60 * 60 * 1000;

    if (calcDates > 0 && calcDates <= calcHour) {
      this.setBorderColor();
    }

    if (this.checkIfComplated === 'complated') {
      this.removeBorder();
    }
  }

  setBorderColor() {
    this.render.setStyle(this.element.nativeElement, 'border', '1px solid red');
  }

  removeBorder() {
    this.render.setStyle(
      this.element.nativeElement,
      'border',
      '1px solid gray'
    );
  }
}
