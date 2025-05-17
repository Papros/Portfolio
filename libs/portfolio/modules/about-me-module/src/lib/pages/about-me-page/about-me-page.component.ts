import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurriculumVitaeComponent } from '../../components/curriculum-vitae/curriculum-vitae.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-about-me-page',
  imports: [CommonModule, CurriculumVitaeComponent, MatIconModule],
  templateUrl: './about-me-page.component.html',
  styleUrl: './about-me-page.component.scss',
})
export class AboutMePageComponent {}
