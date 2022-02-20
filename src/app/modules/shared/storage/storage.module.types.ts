import { InjectionToken } from "@angular/core";
import { IStorageService } from "./interfaces";

export const STORAGE_SERVICE = new InjectionToken<IStorageService>('STORAGE_SERVICE');
