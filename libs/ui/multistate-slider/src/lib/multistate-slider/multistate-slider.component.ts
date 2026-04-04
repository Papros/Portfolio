import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  ContentChildren,
  DestroyRef,
  effect,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
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
import { filter, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);

  options = input<SliderOption<T>[]>([]);
  value = input<T>();
  config = input<SliderConfig>({});

  valueChange = output<T>();

  protected selectedIndex = signal<number>(0);
  protected isExpanded = signal<boolean>(false);

  protected expandMode = computed(() => this.config().expandMode ?? 'always');
  protected expandDirection = computed(
    () => this.config().expandDirection ?? 'ltr',
  );
  protected isCollapsible = computed(() => this.expandMode() !== 'always');
  protected isOverlay = computed(() => this.config().overlayExpand ?? false);
  protected isVertical = computed(
    () => this.expandDirection() === 'ttb' || this.expandDirection() === 'btt',
  );

  protected thumbTransform = computed(() => {
    if (this.isCollapsible() && !this.isExpanded()) {
      return 'translate(0, 0)';
    }

    const i = this.selectedIndex();
    const dir = this.expandDirection();
    if (dir === 'rtl')
      return `translateX(calc(${i} * -1 * var(--pipr-ms-option-size)))`;
    if (dir === 'ttb')
      return `translateY(calc(${i} * var(--pipr-ms-option-size)))`;
    if (dir === 'btt')
      return `translateY(calc(${i} * -1 * var(--pipr-ms-option-size)))`;
    return `translateX(calc(${i} * var(--pipr-ms-option-size)))`;
  });

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

  @HostBinding('class.ms-host--ltr')
  get dirLtr() {
    return this.expandDirection() === 'ltr';
  }

  @HostBinding('class.ms-host--rtl')
  get dirRtl() {
    return this.expandDirection() === 'rtl';
  }

  @HostBinding('class.ms-host--center')
  get dirCenter() {
    return this.expandDirection() === 'center';
  }

  @HostBinding('class.ms-host--ttb')
  get dirTtb() {
    return this.expandDirection() === 'ttb';
  }

  @HostBinding('class.ms-host--btt')
  get dirBtt() {
    return this.expandDirection() === 'btt';
  }

  private readonly elRef = inject(ElementRef);

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

    effect((onCleanup) => {
      if (this.expandMode() !== 'hover') return;
      const el = this.elRef.nativeElement;
      const enter = () => this.isExpanded.set(true);
      const leave = () => this.isExpanded.set(false);
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      onCleanup(() => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    });

    effect((onCleanup) => {
      if (this.expandMode() !== 'click') return;
      const handler = (e: Event) => {
        if (!this.elRef.nativeElement.contains(e.target as Node)) {
          this.isExpanded.set(false);
        }
      };
      document.addEventListener('click', handler);
      onCleanup(() => document.removeEventListener('click', handler));
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
    this.projectedOptions.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateProjectedOptions());
  }

  protected expand(): void {
    this.isExpanded.set(true);
  }

  protected select(index: number, event: MouseEvent): void {
    event.stopPropagation();
    const option = this.resolvedOptions()[index];
    if (option?.disabled) return;
    this.selectedIndex.set(index);
    this.valueChange.emit(option.value);
    if (this.expandMode() === 'click') {
      this.isExpanded.set(false);
    }
  }

  protected getTemplateAt(index: number): TemplateRef<any> | null {
    return this.projectedOptionsSig()[index]?.template ?? null;
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
        this.select(index, event as unknown as MouseEvent);
        return;
      default:
        return;
    }

    event.preventDefault();
    while (options[newIndex]?.disabled) {
      newIndex = newIndex === lastIndex ? 0 : newIndex + 1;
      if (newIndex === index) return;
    }
    this.select(newIndex, event as unknown as MouseEvent);
    queueMicrotask(() => this.focusOption(newIndex));
  }

  protected focusOption(index: number): void {
    const el = this.optionButtons?.get(index)?.nativeElement;
    el?.focus();
  }
}
