import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '@portfolio/shared-pack/components';

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
  imports: [CommonModule, RouterLink, MatIconModule, FooterComponent],
  templateUrl: './tutorial-menu-page.component.html',
  styleUrl: './tutorial-menu-page.component.scss',
})
export class TutorialMenuPageComponent {
  placeholder = 'assets/images/component-demo/component-placeholder.png';

  readonly tutorials: TutorialCard[] = [
    {
      title: 'RxJS: Playground',
      description:
        'Marble diagrams, operatory pipe, kombinowanie streamów. Nauka przez interaktywne wyzwania.',
      image: 'assets/images/tutorials/rxjs-icon.png',
      route: 'rxjs',
      tags: ['rxjs', 'observables', 'operators'],
      available: true,
    },
    {
      title: 'Angular: Change detection',
      description:
        'Detection tree, zone vs. zoneless. Nauka przez interaktywne wyzwania.',
      image: '',
      route: 'change-detection',
      tags: ['change detection', 'observables', 'javascript'],
      available: false,
    },
    {
      title: 'JavaScript: Event Loop',
      description:
        'Tasks queue, edge cases. Nauka przez interaktywne wyzwania.',
      image: '',
      route: 'event-loop',
      tags: ['Event-loop', 'javascript'],
      available: false,
    },
  ];
}
