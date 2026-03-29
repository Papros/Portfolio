import { Injectable } from '@angular/core';
import { IStorageService } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class BrowserStorageService implements IStorageService {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`StorageService: failed to set key "${key}"`);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
