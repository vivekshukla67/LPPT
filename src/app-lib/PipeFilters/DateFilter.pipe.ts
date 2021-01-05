import { Pipe, PipeTransform, Injectable } from '@angular/core';
@Pipe({
    name: 'dateFilter'
})

export class DateFilter implements PipeTransform {
    transform(Value: any) {
            let startedOn = new Date(Value * 1000);
            return this.formatDate(startedOn);
    }

    formatDate(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return  monthNames[monthIndex] + ' ' +day + ' ' + year;
    }

}