import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CurriculumVitaeComponent } from '@portfolio/about-me-module';

@Component({
  selector: 'lib-about-me-page',
  imports: [CommonModule, CurriculumVitaeComponent, MatIconModule],
  templateUrl: './about-me-page.component.html',
  styleUrl: './about-me-page.component.scss',
})
export class AboutMePageComponent {}
