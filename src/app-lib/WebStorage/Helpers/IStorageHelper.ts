export interface IStorageHelper {
    
    Container(storageStrategy: StorageStrategyEnum): Storage;

    Read(key: string, defaultValue: any, storageStrategy: StorageStrategyEnum);

    Write(key: string, value: any, storageStrategy: StorageStrategyEnum): void;

    Exist(key: string, storageStrategy: StorageStrategyEnum): boolean;

    Remove(key: string, storageStrategy: StorageStrategyEnum): void;
}

export enum StorageStrategyEnum {

    LocalStorage,
    
    SessionStorage,
    
    CookiesStorage

}