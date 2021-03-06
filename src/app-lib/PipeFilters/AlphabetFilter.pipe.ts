import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupByAlphabet' })
export class AlphabetPipe implements PipeTransform {
    transform(collection: Array<object>, propertyName: string): Array<object> {
        // prevents the application from breaking if the array of objects doesn't exist yet
        if (!collection) {
            return null;
        }

        const groupedCollection = collection.reduce((previous, current) => {
            if (!previous[current[propertyName].charAt(0).toUpperCase()]) {
                previous[current[propertyName].charAt(0).toUpperCase()] = [current];
            } else {
                previous[current[propertyName].charAt(0).toUpperCase()].push(current);
            }
            return previous;
        }, {});

        // this will return an array of objects, each object containing a group of objects
        return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
    }
}