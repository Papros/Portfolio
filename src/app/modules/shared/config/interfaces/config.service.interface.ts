import { BehaviorSubject, Observable } from "rxjs";
import { IConfig } from "./config.interface";

export interface IConfigservice {
    Config$: BehaviorSubject<IConfig>;

    fetch(): IConfig;
    getConfig(): IConfig;
}
