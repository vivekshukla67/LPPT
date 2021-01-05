import { IStorageHelper, StorageStrategyEnum } from "./IStorageHelper";
import * as CryptoJS from 'crypto-js';

export class StorageHelper implements IStorageHelper {

    Container(storageStrategy: StorageStrategyEnum): Storage {
        switch (storageStrategy) {

            case StorageStrategyEnum.LocalStorage:
                return localStorage;

            case StorageStrategyEnum.SessionStorage:
                return sessionStorage;

            default:
                throw new Error("Method not implemented.");

        }
    }

    Read(key: string, defaultValue: any, storageStrategy: StorageStrategyEnum) {

        if (this.Container(storageStrategy).getItem(key) === null || this.Container(storageStrategy).getItem(key) === "null")
            return defaultValue;

        var cipherText = this.Container(storageStrategy).getItem(key);

        var plainText = CryptoJS.AES.decrypt(cipherText.trim(), "3skGhse9q7GbXiRaoT34XA==").toString(CryptoJS.enc.Utf8);

        return JSON.parse(plainText);
    }

    Write(key: string, value: any, storageStrategy: StorageStrategyEnum): void {
        if (value) {
            this.Container(storageStrategy).setItem(key, null);
            var cipherText = CryptoJS.AES.encrypt(JSON.stringify(value).trim(), "3skGhse9q7GbXiRaoT34XA==").toString();
            this.Container(storageStrategy).setItem(key, cipherText);
        } else {
            this.Container(storageStrategy).setItem(key, null);
        }
    }

    Exist(key: string, storageStrategy: StorageStrategyEnum): boolean {
        if (this.Container(storageStrategy).getItem(key) === null)
            return false;
        else
            return true;
    }

    Remove(key: string, storageStrategy: StorageStrategyEnum): void {
        if (this.Container(storageStrategy).getItem(key) === null)
            return;
        this.Container(storageStrategy).removeItem(key);
    }
}