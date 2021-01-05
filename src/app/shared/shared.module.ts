import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSliderModule, MatGridListModule, MatTableModule, MatPaginatorModule } from '@angular/material/';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule } from '@angular/material/dialog';
import { IndexPipeModule } from 'src/app-lib/PipeFilters/IndexPipe.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule, StyleUtils, StylesheetMap, MediaMarshaller, ɵMatchMedia, BreakPointRegistry, PrintHook, LayoutStyleBuilder, FlexStyleBuilder, ShowHideStyleBuilder, FlexOrderStyleBuilder } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        MatPaginatorModule,
        MatButtonModule,
        MatToolbarModule,
        MatSelectModule,
        MatTabsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatCardModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDialogModule,
        IndexPipeModule,
        InfiniteScrollModule,
        MatButtonToggleModule,
        MatProgressBarModule,
        MatExpansionModule,
        FlexLayoutModule,
        DragDropModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatButtonModule,
        MatMenuModule,
        MatTabsModule,
        MatChipsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        MatTooltipModule,
        MatTableModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatSliderModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDialogModule,
        IndexPipeModule,
        InfiniteScrollModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatProgressBarModule,
        FlexLayoutModule,
        DragDropModule
    ],
    declarations: [
    ],
    providers: [
        StyleUtils, StylesheetMap, MediaMarshaller, ɵMatchMedia, BreakPointRegistry, PrintHook, LayoutStyleBuilder, FlexStyleBuilder, ShowHideStyleBuilder, FlexOrderStyleBuilder
    ]
})
export class SharedModule { }