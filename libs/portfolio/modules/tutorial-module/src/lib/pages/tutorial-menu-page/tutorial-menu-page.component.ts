import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface TutorialCard {
  title: string;
  description: string;
  image: string;
  route: string;
  tags: string[];
  available: boolean;
}

@Component({
  selector: 'lib-tutorial-menu-page',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './tutorial-menu-page.component.html',
  styleUrl: './tutorial-menu-page.component.scss',
})
export class TutorialMenuPageComponent {
  placeholder = 'assets/images/component-demo/component-placeholder.png';

  readonly tutorials: TutorialCard[] = [
    {
      title: 'RxJS Playground',
      description:
        'Marble diagrams, operatory pipe, kombinowanie streamów. Nauka przez interaktywne wyzwania.',
      image: 'assets/images/tutorials/rxjs-icon.png',
      route: 'rxjs',
      tags: ['rxjs', 'observables', 'operators'],
      available: true,
    },
    {
      title: 'RxJS Playground',
      description:
        'Marble diagrams, operatory pipe, kombinowanie streamów. Nauka przez interaktywne wyzwania.',
      image: '',
      route: 'rxjs',
      tags: ['rxjs', 'observables', 'operators'],
      available: true,
    },
    {
      title: 'RxJS Playground',
      description:
        'Marble diagrams, operatory pipe, kombinowanie streamów. Nauka przez interaktywne wyzwania.',
      image: '',
      route: 'rxjs',
      tags: ['rxjs', 'observables', 'operators'],
      available: true,
    },
    {
      title: 'RxJS Playground',
      description:
        'Marble diagrams, operatory pipe, kombinowanie streamów. Nauka przez interaktywne wyzwania.',
      image: 'assets/images/tutorials/rxjs-icon.png',
      route: 'rxjs',
      tags: ['rxjs', 'observables', 'operators'],
      available: true,
    },
    {
      title: 'RxJS Playground',
      description:
        'Marble diagrams, operatory pipe, kombinowanie streamów. Nauka przez interaktywne wyzwania.',
      image: 'assets/images/tutorials/rxjs-icon.png',
      route: 'rxjs',
      tags: ['rxjs', 'observables', 'operators'],
      available: true,
    },
    {
      title: 'RxJS Playground',
      description:
        'Marble diagrams, operatory pipe, kombinowanie streamów. Nauka przez interaktywne wyzwania.',
      image: 'assets/images/tutorials/rxjs-icon.png',
      route: 'rxjs',
      tags: ['rxjs', 'observables', 'operators'],
      available: true,
    },
  ];
}
