import { Observable } from "rxjs";
import { ILoaderUpdateMessage } from "./loader-update-message.interface";

export interface ILoaderService {
    register(loaderToken?: string): string;
    unregister(loaderToken: string): boolean;
    show(loaderToken: string, ticket?: string): string;
    hide(loaderToken:string, ticket: string): boolean;
    getLoaderState(loaderToken:string): boolean;
    getLoaderSubscription(): Observable<ILoaderUpdateMessage>;
};