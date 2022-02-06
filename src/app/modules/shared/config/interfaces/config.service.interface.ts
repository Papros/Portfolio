import { IConfig } from "./config.interface";

export interface IConfigservice {
    fetch(): IConfig;
    getConfig(): IConfig;
}
