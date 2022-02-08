import { Injectable } from "@angular/core";
import moment from "moment";
import { BehaviorSubject, Observable } from "rxjs";
import { ILoaderService, ILoaderUpdateMessage } from "../interfaces";

@Injectable()
export class LoaderService implements ILoaderService {

    private loadersState = new Map<String,String[]>();
    private readonly loadersStatus = new BehaviorSubject<ILoaderUpdateMessage>({loaderToken:"",state:false});

    public getLoaderSubscription(): Observable<ILoaderUpdateMessage> {
        return this.loadersStatus.asObservable();
    }

    public unregister(loaderToken: string): boolean {
        const resoult = this.loadersState.delete(loaderToken);
        this.updateLoaderStatus(loaderToken);
        return resoult;
    }

    public show(loaderToken: string, ticket?: string): string {
        const token = ticket || this.getToken();
        const components = this.loadersState.get(loaderToken)
        components?.push(token);
        this.updateLoaderStatus(loaderToken);
        return token;
    }

    public hide(loaderToken: string, ticket: string): boolean {
        const token = ticket || this.getToken();
        const components = this.loadersState.get(loaderToken)?.filter( tkn => tkn !== ticket );
        if(components) {
            this.loadersState.set(loaderToken, components);
            this.updateLoaderStatus(loaderToken);
            return true;
        } else {
            return this.unregister(loaderToken);
        }
    }

    public getLoaderState(loaderToken: string): boolean {
        return !!this.loadersState.get(loaderToken)?.length;
    }

    public register(loaderToken?: string): string {
        const token : string = loaderToken || this.getToken('loader');
        this.loadersState.set(token, []);
        this.updateLoaderStatus(token);
        return token;
    }
    
    private getToken(prefix?:string): string {
        return `${prefix}:${ moment().format('x') }`;
    }

    private updateLoaderStatus(loaderToken: string) {
        this.loadersStatus.next({
            loaderToken: loaderToken,
            state: this.getLoaderState(loaderToken)
        });
    }
}