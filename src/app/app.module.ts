import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from './shared';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommandBarFilterComponent } from './SharedComponents/command-bar-filter/command-bar-filter.component';
import { FilterControlComponent } from './SharedComponents/filter-control/filter-control.component';
import { DateFilterControlComponent } from './SharedComponents/date-filter-control/date-filter-control.component';
import { ButtonControlComponent } from './SharedComponents/button-control/button-control.component';
import { OverflowFilterControlComponent } from './SharedComponents/overflow-filter-control/overflow-filter-control.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { ExpansionControlComponent } from './SharedComponents/expansionPanel-control/expansionPanel.component';
import { GridsterModule } from 'angular-gridster2';
import { DatePickerComponent } from './SharedComponents/date-picker/date-picker.component'
import { AlphabetPipe } from 'src/app-lib/PipeFilters/AlphabetFilter.pipe';
import { GroupByPipe } from 'src/app-lib/PipeFilters/GroupBy.pipe';
import { ProgressBarColor } from 'src/app-lib/UIControls/ProgressBarColor';
import { ToastrComponent } from 'src/app-lib/toastr/toastr/toastr.component';
import { DateRangePickerComponent } from './SharedComponents/date-range-picker/date-range-picker.component';
import { DateFilter } from 'src/app-lib/PipeFilters/DateFilter.pipe';
import { AlertModule } from './alert';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { ChartComponent } from './WidgetControls/chart/chart.component';
import { MapComponent } from './WidgetControls/map/map.component';
import { CountComponent } from './WidgetControls/count/count.component';
import { DataGridComponent } from './WidgetControls/data-grid/data-grid.component';
import { FilterComponent } from './WidgetControls/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    AppShellComponent,
    HomeDashboardComponent,
    LandingPageComponent,
    CommandBarFilterComponent,
    FilterControlComponent,
    DateFilterControlComponent,
    ButtonControlComponent,
    OverflowFilterControlComponent,
    FieldErrorDisplayComponent,
    ExpansionControlComponent,
    DatePickerComponent,
    AlphabetPipe,
    GroupByPipe,
    ProgressBarColor,
    ToastrComponent,
    DateRangePickerComponent,
    DateFilter,
    ChartComponent,
    MapComponent,
    CountComponent,
    DataGridComponent,
    FilterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    GridsterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AlertModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    CommandBarFilterComponent,
    FilterControlComponent,
    DateFilterControlComponent,
    ButtonControlComponent,
    OverflowFilterControlComponent,
    ExpansionControlComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  entryComponents: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
