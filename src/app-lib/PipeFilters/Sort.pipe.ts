import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {

    /**
     * This function sort the array of object
     * based on the key passed
     * @param items it contains Array<object>
     * @param field it contains the key based on 
     * which, sorting has to be done
     * @param reverse default is `true`(means `ascending order`)
     * and if `false`(means `descending order`).
     */
    transform(items: any[], field: string, reverse: boolean = false): any[] {
        if (!items) return [];

        if (field) items.sort((a, b) => a[field] > b[field] ? 1 : -1);
        else items.sort((a, b) => a > b ? 1 : -1);

        if (reverse) items.reverse();

        return items;
    }
}