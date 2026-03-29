import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-theme-selector',
  imports: [CommonModule, MatIconModule],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
})
export class ThemeSelectorComponent {
  themeService = inject(ThemeService);
}
