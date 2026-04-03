import { Component, computed, signal } from '@angular/core';
import {
  MultistateSliderComponent,
  SliderOptionComponent,
} from '@papros-it/multistate-slider';

type DistanceUnit = 'km' | 'mi';
type TempUnit = 'C' | 'F' | 'K';
type CurrencyUnit = 'PLN' | 'EUR' | 'USD';

@Component({
  selector: 'docs-unit-converter-multistate-slider',
  standalone: true,
  imports: [MultistateSliderComponent, SliderOptionComponent],
  templateUrl: './unit-converter-multistate-slider.example.component.html',
  styleUrl: './unit-converter-multistate-slider.example.component.scss',
})
export class UnitConverterMultistateSliderExampleComponent {
  // base values
  private readonly BASE_KM = 42.195;
  private readonly BASE_C = 21;
  private readonly BASE_PLN = 1000;

  distanceUnit = signal<DistanceUnit>('km');
  tempUnit = signal<TempUnit>('C');
  currency = signal<CurrencyUnit>('PLN');

  displayDistance = computed(() => {
    const v =
      this.distanceUnit() === 'km' ? this.BASE_KM : this.BASE_KM * 0.621371;
    return v.toFixed(2) + ' ' + this.distanceUnit();
  });

  displayTemp = computed(() => {
    const unit = this.tempUnit();
    if (unit === 'C') return `${this.BASE_C} °C`;
    if (unit === 'F') return `${((this.BASE_C * 9) / 5 + 32).toFixed(1)} °F`;
    return `${(this.BASE_C + 273.15).toFixed(2)} K`;
  });

  displayCurrency = computed(() => {
    const rates: Record<CurrencyUnit, number> = {
      PLN: 1,
      EUR: 0.23,
      USD: 0.25,
    };
    const symbols: Record<CurrencyUnit, string> = {
      PLN: 'zł',
      EUR: '€',
      USD: '$',
    };
    const unit = this.currency();
    const value = (this.BASE_PLN * rates[unit]).toFixed(2);
    return `${symbols[unit]}${value}`;
  });
}
