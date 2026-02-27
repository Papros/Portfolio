import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { COMPONENT_DOCS, ComponentDoc } from '@docs-model';

@Component({
  selector: 'lib-component-details',
  templateUrl: './component-details.component.html',
  styleUrl: './component-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ComponentDetailsComponent {
  readonly doc$: Observable<ComponentDoc | undefined>;

  constructor(private route: ActivatedRoute) {
    this.doc$ = this.route.paramMap.pipe(
      map((params) => params.get('component')),
      map((id) => COMPONENT_DOCS.find((doc) => doc.id === id))
    );
  }
}
