import { Component, input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'pipr-slider-option',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './slider-option.component.html',
  styleUrl: './slider-option.component.scss',
})
export class SliderOptionComponent<T = unknown> {
  value = input.required<T>();
  disabled = input(false);

  @ViewChild(TemplateRef, { static: true })
  public template!: TemplateRef<any>;
}
