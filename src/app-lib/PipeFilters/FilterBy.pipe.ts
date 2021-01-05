import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterBy' })
export class FilterBy implements PipeTransform {
    transform(collection: Array<object>, key: string, filterType: string): Array<object> {

        if (!collection)
            return null;

        collection = collection.filter(element => element[key] === filterType);

        return collection;
    }
}