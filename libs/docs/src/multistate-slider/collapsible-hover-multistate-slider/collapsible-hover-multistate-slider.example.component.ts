import { Component, signal } from '@angular/core';
import {
  MultistateSliderComponent,
  SliderConfig,
  SliderOption,
} from '@papros-it/multistate-slider';

@Component({
  selector: 'docs-collapsible-hover-multistate-slider',
  standalone: true,
  imports: [MultistateSliderComponent],
  templateUrl: './collapsible-hover-multistate-slider.example.component.html',
  styleUrl: './collapsible-hover-multistate-slider.example.component.scss',
})
export class CollapsibleHoverMultistateSliderExampleComponent {
  selected = signal<string>('light');

  config: SliderConfig = {
    expandMode: 'hover',
    expandDirection: 'ltr',
  };

  options: SliderOption<string>[] = [
    { value: 'light', icon: '☀️', label: 'Light' },
    { value: 'dark', icon: '🌙', label: 'Dark' },
    { value: 'save', icon: '💾', label: 'Save' },
    { value: 'system', icon: '🖥️', label: 'System' },
  ];
}
