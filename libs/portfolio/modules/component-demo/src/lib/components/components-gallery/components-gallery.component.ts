import { Component } from '@angular/core';
import { COMPONENT_DOCS, ComponentDoc } from '@docs-model';

@Component({
  selector: 'lib-components-gallery',
  standalone: false,
  templateUrl: './components-gallery.component.html',
  styleUrl: './components-gallery.component.scss',
})
export class ComponentsGalleryComponent {
  get componentList(): ComponentDoc[] {
    return COMPONENT_DOCS || [];
  }
}
