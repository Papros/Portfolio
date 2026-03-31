import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  ContentChildren,
  effect,
  ElementRef,
  input,
  OnInit,
  output,
  QueryList,
  signal,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderConfig, SliderOption } from './multistate-slider.interface';
import { SliderOptionComponent } from '../slider-option/slider-option.component';

@Component({
  selector: 'pipr-multistate-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multistate-slider.component.html',
  styleUrl: './multistate-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultistateSliderComponent<T = unknown>
  implements OnInit, AfterContentInit
{
  //Inputs
  options = input<SliderOption<T>[]>([]);
  value = input<T>();
  config = input<SliderConfig>({});

  //Outputs
  valueChange = output<T>();

  //Internal state
  protected selectedIndex = signal<number>(0);
  protected thumbOffset = computed(
    () => `${this.selectedIndex() * (100 / this.resolvedOptions().length)}%`,
  );
  protected trackWidth = computed(
    () => `${100 / this.resolvedOptions().length}%`,
  );

  protected resolvedOptions = computed<SliderOption<T>[]>(() => {
    const projected = this.projectedOptionsSig();

    if (projected.length) {
      return projected.map((o) => ({
        value: o.value(),
        disabled: o.disabled(),
      }));
    }

    return this.options();
  });

  protected projectedOptionsSig = signal<SliderOptionComponent<T>[]>([]);

  protected getTemplateAt(index: number): TemplateRef<any> | null {
    return this.projectedOptionsSig()[index]?.template ?? null;
  }

  @ContentChildren(SliderOptionComponent)
  private projectedOptions!: QueryList<SliderOptionComponent<T>>;

  @ViewChildren('optionBtn')
  private optionButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  constructor() {
    effect(() => {
      const options = this.resolvedOptions();
      const value = this.value();

      if (!options.length) return;

      const index = options.findIndex((o) => o.value === value);

      if (index >= 0 && index !== this.selectedIndex()) {
        this.selectedIndex.set(index);
      }
    });
  }

  ngOnInit() {
    const initial = this.resolvedOptions().findIndex(
      (o) => o.value === this.value(),
    );
    if (initial >= 0) this.selectedIndex.set(initial);
  }

  ngAfterContentInit() {
    this.updateProjectedOptions();

    this.projectedOptions.changes.subscribe(() => {
      this.updateProjectedOptions();
    });
  }

  protected select(index: number): void {
    const option = this.resolvedOptions()[index];
    if (option?.disabled) return;

    this.selectedIndex.set(index);
    this.valueChange.emit(option.value);
  }

  private updateProjectedOptions() {
    this.projectedOptionsSig.set(this.projectedOptions?.toArray() ?? []);
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const options = this.resolvedOptions();
    const lastIndex = options.length - 1;

    let newIndex = index;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        newIndex = index === lastIndex ? 0 : index + 1;
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        newIndex = index === 0 ? lastIndex : index - 1;
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        this.select(index);
        return;

      default:
        return;
    }

    event.preventDefault();

    while (options[newIndex]?.disabled) {
      newIndex = newIndex === lastIndex ? 0 : newIndex + 1;

      if (newIndex === index) return;
    }

    this.select(newIndex);

    queueMicrotask(() => {
      this.focusOption(newIndex);
    });
  }

  protected focusOption(index: number): void {
    const el = this.optionButtons?.get(index)?.nativeElement;
    el?.focus();
  }
}
