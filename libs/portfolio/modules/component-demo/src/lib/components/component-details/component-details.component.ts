import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentDoc } from '@docs-model';
import { Input } from '@angular/core';

@Component({
  selector: 'lib-component-details',
  templateUrl: './component-details.component.html',
  styleUrl: './component-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ComponentDetailsComponent {
  readonly doc: ComponentDoc;

  constructor(private route: ActivatedRoute) {
    this.doc = this.route.snapshot.data['doc'];
  }
}
