import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { STORAGE_SERVICE } from '@portfolio/persistence';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private transloco = inject(TranslocoService);
  private storage = inject(STORAGE_SERVICE);

  private readonly STORAGE_KEY = 'app-lang';
  private readonly DEFAULT = 'en';
  private readonly AVAILABLE = ['en', 'pl'];

  readonly activeLang = signal<string>(this.loadFromStorage());

  constructor() {
    effect(() => {
      const lang = this.activeLang();
      this.transloco.setActiveLang(lang);
      this.storage.set(this.STORAGE_KEY, lang);
    });
  }

  setLang(lang: string): void {
    if (this.AVAILABLE.includes(lang)) {
      this.activeLang.set(lang);
    }
  }

  getAvailable(): string[] {
    return this.AVAILABLE;
  }

  private loadFromStorage(): string {
    const stored = this.storage.get<string>(this.STORAGE_KEY);
    return stored && this.AVAILABLE.includes(stored) ? stored : this.DEFAULT;
  }
}
