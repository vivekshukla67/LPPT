import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { OrderByPipe } from './Sort.pipe';
import { FilterBy } from './FilterBy.pipe';

@NgModule({
    declarations: [OrderByPipe, FilterBy],
    imports: [CommonModule],
    exports: [OrderByPipe, FilterBy]
})

export class IndexPipeModule { }