import {
  Directive,
  OnChanges,
  AfterViewInit,
  Input,
  ElementRef,
} from '@angular/core';
import * as Prism from 'prismjs';

@Directive({
  selector: '[libCodeHighlight]',
})
export class CodeHighlightDirective implements AfterViewInit, OnChanges {
  @Input() code!: string;
  @Input() language = 'ts';

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.highlight();
  }

  ngOnChanges() {
    this.highlight();
  }

  private highlight() {
    if (!this.el.nativeElement || !this.code) return;

    this.el.nativeElement.className = `line-numbers language-${this.language}`;
    this.el.nativeElement.innerHTML = Prism.highlight(
      this.code,
      Prism.languages[this.language] ?? Prism.languages['plain'],
      this.language,
    );
    Prism.highlightElement(this.el.nativeElement);
  }
}
