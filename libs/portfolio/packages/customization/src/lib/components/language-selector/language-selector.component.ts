import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MultistateSliderComponent,
  SliderOptionComponent,
  SliderConfig,
} from '@papros-it/multistate-slider';
import { ThemeMode } from '../../interfaces/theme.interface';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'lib-language-selector',
  imports: [
    CommonModule,
    MatIconModule,
    MultistateSliderComponent,
    SliderOptionComponent,
    MatTooltipModule,
  ],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent {
  translationService = inject(TranslocoService);

  ThemeMode = ThemeMode;

  get activeLang() {
    return this.translationService.getActiveLang();
  }

  onLanguageChange(lang: string): void {
    this.translationService.setActiveLang(lang);
  }

  sliderConfig: SliderConfig = {
    expandMode: 'click',
    expandDirection: 'ltr',
  };
}
