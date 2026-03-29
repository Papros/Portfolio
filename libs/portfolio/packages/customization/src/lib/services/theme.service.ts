import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { ThemeMode } from '../interfaces/theme.interface';
import { STORAGE_SERVICE } from '@portfolio/persistence';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storage = inject(STORAGE_SERVICE);

  private readonly STORAGE_KEY = 'app-theme';
  private readonly DEFAULT: ThemeMode = 'dark';

  readonly mode = signal<ThemeMode>(this.loadFromStorage());
  readonly isDark = computed(() => this.mode() === 'dark');

  constructor() {
    effect(() => {
      this.applyToDOM(this.mode());
      this.storage.set(this.STORAGE_KEY, this.mode());
    });
  }

  toggle(): void {
    this.mode.update((m) => (m === 'dark' ? 'light' : 'dark'));
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  private loadFromStorage(): ThemeMode {
    return this.storage.get<ThemeMode>(this.STORAGE_KEY) ?? this.DEFAULT;
  }

  private applyToDOM(mode: ThemeMode): void {
    console.log(`Applying theme: ${mode}`);
    document.documentElement.setAttribute('data-theme', mode);
  }
}
