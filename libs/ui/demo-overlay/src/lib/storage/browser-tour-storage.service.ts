import { Injectable } from '@angular/core';
import { IPiprTourStorage } from './tour-storage.token';

const STORAGE_KEY_PREFIX = 'pipr_tour_seen';

@Injectable()
export class BrowserTourStorageService implements IPiprTourStorage {
  private storageKey(userId: string): string {
    return `${STORAGE_KEY_PREFIX}_${userId}`;
  }

  private readSet(userId: string): Set<string> {
    try {
      const raw = localStorage.getItem(this.storageKey(userId));
      return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  }

  private writeSet(userId: string, set: Set<string>): void {
    try {
      localStorage.setItem(
        this.storageKey(userId),
        JSON.stringify(Array.from(set)),
      );
    } catch {
      // localStorage may be unavailable (SSR, private mode quota)
    }
  }

  markSeen(userId: string, id: string): void {
    const set = this.readSet(userId);
    set.add(id);
    this.writeSet(userId, set);
  }

  hasSeen(userId: string, id: string): boolean {
    return this.readSet(userId).has(id);
  }

  clearSeen(userId: string, id?: string): void {
    if (id === undefined) {
      try {
        localStorage.removeItem(this.storageKey(userId));
      } catch {
        return;
      }
      return;
    }
    const set = this.readSet(userId);
    set.delete(id);
    this.writeSet(userId, set);
  }

  getAllSeen(userId: string): string[] {
    return Array.from(this.readSet(userId));
  }
}
