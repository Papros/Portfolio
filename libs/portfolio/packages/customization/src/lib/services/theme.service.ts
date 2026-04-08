import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { ThemeMode } from '../interfaces/theme.interface';
import { STORAGE_SERVICE } from '@portfolio/persistence';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storage = inject(STORAGE_SERVICE);

  private readonly STORAGE_KEY = 'app-theme';
  private readonly DEFAULT: ThemeMode = ThemeMode.Dusk;

  readonly mode = signal<ThemeMode>(this.loadFromStorage());
  readonly isDark = computed(() => this.mode() === ThemeMode.Dark);

  constructor() {
    effect(() => {
      this.applyToDOM(this.mode());
      this.storage.set(this.STORAGE_KEY, this.mode());
    });
  }

  toggle(): void {
    this.mode.update((m) =>
      m === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark,
    );
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  private loadFromStorage(): ThemeMode {
    return this.storage.get<ThemeMode>(this.STORAGE_KEY) ?? this.DEFAULT;
  }

  private applyToDOM(mode: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', mode);
  }
}
