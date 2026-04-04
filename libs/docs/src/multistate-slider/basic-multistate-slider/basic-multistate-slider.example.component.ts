import { Component, signal } from '@angular/core';
import { MultistateSliderComponent } from '@papros-it/multistate-slider';
import { SliderOption } from '@papros-it/multistate-slider';

@Component({
  selector: 'docs-basic-multistate-slider',
  standalone: true,
  imports: [MultistateSliderComponent],
  templateUrl: './basic-multistate-slider.example.component.html',
  styleUrl: './basic-multistate-slider.example.component.scss',
})
export class BasicMultistateSliderExampleComponent {
  selected = signal<string>('light');

  options: SliderOption<string>[] = [
    { value: 'light', icon: '☀️', label: 'Light' },
    { value: 'dark', icon: '🌙', label: 'Dark' },
    { value: 'system', icon: '💻', label: 'System' },
  ];
}
