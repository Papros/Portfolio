import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MultistateSliderComponent,
  SliderOptionComponent,
} from '@papros-it/multistate-slider';

@Component({
  selector: 'docs-projected-options-multistate-slider',
  standalone: true,
  imports: [MultistateSliderComponent, SliderOptionComponent, MatIconModule],
  templateUrl: './projected-options-multistate-slider.example.component.html',
  styleUrl: './projected-options-multistate-slider.example.component.scss',
})
export class ProjectedOptionsMultistateSliderExampleComponent {
  selected = signal<string>('light');
}
