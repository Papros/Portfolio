import { Injectable } from "@angular/core";
import { StorageKey } from "../enums";
import { IStorageService } from "../interfaces";

@Injectable()
export class StorageService implements IStorageService {
    
    saveByKey(key: StorageKey, value: any): boolean {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }

    getByKey<T extends any>(key: StorageKey): T {
        const item = localStorage.getItem(key);

        return item ? JSON.parse(item) : undefined;
    }

    removeByKey(key: StorageKey): boolean {
        if(localStorage.getItem(key)){
            localStorage.removeItem(key);
            return true;
        } else {
            return false;
        }
    }

    clearStorage(): boolean {
        localStorage.clear();
        return true;
    }

    updateByKey<T extends any>(key: StorageKey, modifier: (object: T) => T): boolean {
        let newItem: T;
        newItem = modifier(JSON.parse(this.getByKey(key)));

        if(newItem) {
            this.saveByKey(key, newItem);
            return true;
        } else {
            return false;
        }
    }
    
}