import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentDoc } from '@docs-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-component-details',
  templateUrl: './component-details.component.html',
  styleUrl: './component-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ComponentDetailsComponent {
  doc = signal<ComponentDoc | null>(null);
  private destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute) {
    this.route.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.doc.set(data['doc']);
      });
  }
}
