import { InjectionToken } from '@angular/core';

export const PIPR_TOUR_STORAGE = new InjectionToken<IPiprTourStorage>(
  'PiprTourStorage',
);

export interface IPiprTourStorage {
  markSeen(userId: string, id: string): void;
  hasSeen(userId: string, id: string): boolean;
  clearSeen(userId: string, id?: string): void; // reset one or all
  getAllSeen(userId: string): string[];
}
