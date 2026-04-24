import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ALL_CHALLENGES } from '../../mock/challenge.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RxJSChallenge } from '../../interfaces/challenge.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChallengeContainerComponent } from '../../components/challenge-container/challenge-container.component';

@Component({
  selector: 'lib-rxjs-tutorial-page',
  imports: [CommonModule, ChallengeContainerComponent],
  templateUrl: './rxjs-tutorial-page.component.html',
  styleUrl: './rxjs-tutorial-page.component.scss',
})
export class RxjsTutorialPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly challenges = ALL_CHALLENGES;

  readonly challenge = toSignal(
    this.route.data.pipe(
      map((d) => (d['challenge'] as RxJSChallenge) ?? ALL_CHALLENGES[0]),
    ),
    { initialValue: ALL_CHALLENGES[0] },
  );

  readonly currentIndex = toSignal(
    this.route.data.pipe(
      map((d) => {
        const ch = d['challenge'] as RxJSChallenge | undefined;
        return ch ? (ALL_CHALLENGES.findIndex((c) => c.id === ch.id) ?? 0) : 0;
      }),
    ),
    { initialValue: 0 },
  );

  goTo(index: number): void {
    const ch = ALL_CHALLENGES[index];
    if (ch) this.router.navigate(['..', ch.id], { relativeTo: this.route });
  }

  get hasPrev(): boolean {
    return (this.currentIndex() ?? 0) > 0;
  }
  get hasNext(): boolean {
    return (this.currentIndex() ?? 0) < ALL_CHALLENGES.length - 1;
  }
}
