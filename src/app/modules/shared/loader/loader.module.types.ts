import { InjectionToken } from "@angular/core";
import { ILoaderService } from "./interfaces";

export const LOADER_SERVICE = new InjectionToken<ILoaderService>('LOADER_SERVICE');