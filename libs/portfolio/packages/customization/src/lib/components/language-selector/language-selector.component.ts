import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MultistateSliderComponent,
  SliderOptionComponent,
  SliderConfig,
} from '@papros-it/multistate-slider';
import { SliderExpandDirection } from '@papros-it/multistate-slider';
import { TranslationService } from '../../services/translation.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'lib-language-selector',
  imports: [
    CommonModule,
    MatIconModule,
    MultistateSliderComponent,
    SliderOptionComponent,
    MatTooltipModule,
    TranslocoModule,
  ],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent {
  translationService = inject(TranslationService);

  direction = input<SliderExpandDirection>('ltr');

  get activeLang() {
    return this.translationService.activeLang();
  }

  onLanguageChange(lang: string): void {
    this.translationService.setLang(lang);
  }

  sliderConfig: SliderConfig = {
    expandMode: 'click',
    expandDirection: this.direction(),
  };
}
