import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TutorialCard {
  title: string;
  description: string;
  route: string;
  tags: string[];
  available: boolean;
}

@Component({
  selector: 'lib-tutorial-menu-page',
  imports: [RouterLink],
  templateUrl: './tutorial-menu-page.component.html',
  styleUrl: './tutorial-menu-page.component.scss',
})
export class TutorialMenuPageComponent {
  readonly tutorials: TutorialCard[] = [
    {
      title: 'RxJS Playground',
      description:
        'Marble diagrams, operatory pipe, kombinowanie streamów. Nauka przez interaktywne wyzwania.',
      route: 'rxjs',
      tags: ['rxjs', 'observables', 'operators'],
      available: true,
    },
    {
      title: 'Change Detection',
      description:
        'Zrozum jak Angular decyduje kiedy re-renderować komponenty. OnPush, signals, zones.',
      route: 'change-detection',
      tags: ['angular', 'performance', 'signals'],
      available: false,
    },
  ];
}
