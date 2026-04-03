import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { MatIconModule } from '@angular/material/icon';
import {
  MultistateSliderComponent,
  SliderConfig,
  SliderOptionComponent,
} from '@papros-it/multistate-slider';
import { ThemeMode } from '../../interfaces/theme.interface';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'lib-theme-selector',
  imports: [
    CommonModule,
    MatIconModule,
    MultistateSliderComponent,
    SliderOptionComponent,
    MatTooltipModule,
  ],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
})
export class ThemeSelectorComponent {
  themeService = inject(ThemeService);

  ThemeMode = ThemeMode;

  onThemeChange(selectedTheme: ThemeMode): void {
    this.themeService.setMode(selectedTheme);
  }

  sliderConfig: SliderConfig = {
    expandMode: 'click',
    expandDirection: 'ltr',
  };
}
