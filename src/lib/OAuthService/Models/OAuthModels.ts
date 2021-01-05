import { StorageStrategyEnum } from "../Helpers/Enums";

export interface IApplicationStorage {

    Container(storageStrategy: StorageStrategyEnum): Storage;

    Read(key: string, defaultValue: any, storageStrategy: StorageStrategyEnum);

    Write(key: string, value: any, storageStrategy: StorageStrategyEnum): void;

    Exist(key: string, storageStrategy: StorageStrategyEnum): boolean;

    Remove(key: string, storageStrategy: StorageStrategyEnum): void;

}