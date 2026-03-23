import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-demo-card',
  standalone: false,
  templateUrl: './demo-card.component.html',
  styleUrl: './demo-card.component.scss',
})
export class DemoCardComponent {
  @Input()
  imageSrc = 'assets/images/component-demo/component-placeholder.png';

  @Input()
  title = 'Component';

  @Input()
  desc = 'Card for component demo gallery.';

  @Input()
  routingAction: string[] = ['components'];

  placeholder = 'assets/images/component-demo/component-placeholder.png';
}
