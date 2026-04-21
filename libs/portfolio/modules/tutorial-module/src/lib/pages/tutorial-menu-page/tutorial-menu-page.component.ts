import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TutorialContainerComponent } from '@portfolio/rxjs-tutorial';

@Component({
  selector: 'lib-tutorial-menu-page',
  imports: [CommonModule, TutorialContainerComponent],
  templateUrl: './tutorial-menu-page.component.html',
  styleUrl: './tutorial-menu-page.component.scss',
})
export class TutorialMenuPageComponent {}
