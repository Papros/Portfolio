import { StorageKey } from "../enums";

export interface IStorageService {
    saveByKey(key: StorageKey, value: any): boolean;
    getByKey<T extends any>(key: StorageKey): T;
    removeByKey(key: StorageKey): boolean;
    clearStorage(): boolean;
    updateByKey<T extends any>(key: StorageKey, modifier: (object: T) => T): boolean;
}