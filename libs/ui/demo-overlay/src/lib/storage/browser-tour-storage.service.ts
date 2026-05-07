import { Injectable } from '@angular/core';
import { IPiprTourStorage } from './tour-storage.token';

@Injectable()
export class BrowserTourStroageService implements IPiprTourStorage {
  markSeen(userId: string, id: string): void {
    throw new Error('Method not implemented.');
  }
  hasSeen(userId: string, id: string): boolean {
    throw new Error('Method not implemented.');
  }
  clearSeen(userId: string, id?: string): void {
    throw new Error('Method not implemented.');
  }
  getAllSeen(userId: string): string[] {
    throw new Error('Method not implemented.');
  }
}
