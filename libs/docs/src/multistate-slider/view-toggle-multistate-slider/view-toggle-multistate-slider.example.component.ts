import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MultistateSliderComponent,
  SliderOptionComponent,
} from '@papros-it/multistate-slider';

type ViewMode = 'grid' | 'list' | 'compact';

@Component({
  selector: 'docs-view-toggle-multistate-slider',
  standalone: true,
  imports: [MultistateSliderComponent, SliderOptionComponent, MatIconModule],
  templateUrl: './view-toggle-multistate-slider.example.component.html',
  styleUrl: './view-toggle-multistate-slider.example.component.scss',
})
export class ViewToggleMultistateSliderExampleComponent {
  view = signal<ViewMode>('list');

  items = [
    { id: 1, name: 'Mechanical Keyboard', price: '$149', color: '#7c3aed' },
    { id: 2, name: 'Wireless Mouse', price: '$59', color: '#0891b2' },
    { id: 3, name: 'USB-C Hub', price: '$39', color: '#059669' },
    { id: 4, name: 'Monitor Stand', price: '$89', color: '#d97706' },
    { id: 5, name: 'Webcam HD', price: '$99', color: '#dc2626' },
    { id: 6, name: 'Desk Lamp', price: '$45', color: '#7c3aed' },
  ];
}
