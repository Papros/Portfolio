import { ChangeDetectionStrategy, Component } from '@angular/core';
import { COMPONENT_DOCS, ComponentDoc } from '@docs-model';

@Component({
  selector: 'lib-components-gallery',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './components-gallery.component.html',
  styleUrl: './components-gallery.component.scss',
})
export class ComponentsGalleryComponent {
  get componentList(): ComponentDoc[] {
    if (COMPONENT_DOCS[0] && !COMPONENT_DOCS[1]) {
      const component = COMPONENT_DOCS[0];
      const arr: ComponentDoc[] = [
        component,
        component,
        component,
        component,
        component,
        component,
        component,
        component,
      ];
      return arr;
    }

    return COMPONENT_DOCS || [];
  }
}
