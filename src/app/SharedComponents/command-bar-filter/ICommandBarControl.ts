import { EventEmitter } from '@angular/core';
import { Filters } from '../filter-control/Models/FilterModel';

export interface ICommandBarControl {

    filterValueChanged: EventEmitter<Map<string, string>>;

    FilterContext: Filters;
}