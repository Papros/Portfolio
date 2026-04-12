import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMPONENT_META, ComponentMeta } from '@docs-model';

@Component({
  selector: 'lib-components-gallery',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './components-gallery.component.html',
  styleUrl: './components-gallery.component.scss',
})
export class ComponentsGalleryComponent {
  get componentList(): ComponentMeta[] {
    return COMPONENT_META || [];
  }
}
