import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { COMPONENT_DOCS } from './component-details.const';

@Component({
  selector: 'lib-component-details',
  templateUrl: './component-details.component.html',
  styleUrl: './component-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ComponentDetailsComponent {
  readonly doc$;

  constructor(private route: ActivatedRoute) {
    this.doc$ = this.route.paramMap.pipe(
      map((params) => params.get('component')),
      map((id) => COMPONENT_DOCS.find((doc) => doc.id === id))
    );
  }
}
