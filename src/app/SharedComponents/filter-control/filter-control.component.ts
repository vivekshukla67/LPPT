import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filters } from './Models/FilterModel';
import { IFilterService, FilterService } from './Services/FilterControlService';
import { FilterSuggestionModel } from './Models/FilterSuggestionModel';
import { BehaviorSubject } from 'rxjs';
import { ViewStateEnum } from 'src/app/shared/Enums/Enums';
import { ICommandBarControl } from '../command-bar-filter/ICommandBarControl';
import { VisualizationViewModel } from 'src/app/AppComponent/ViewModel/VisualizationVM';

@Component({
  selector: 'app-filter-control',
  templateUrl: './filter-control.component.html',
  styleUrls: ['./filter-control.component.scss'],
  providers: [VisualizationViewModel]
})
export class FilterControlComponent implements OnInit, ICommandBarControl {

  @Output() filterValueChanged: EventEmitter<Map<string, string>>;

  private searchProvider: IFilterService;
  private selectedIds: Set<string>;
  private selectedItems: Array<FilterSuggestionModel>;

  constructor(public visualizationVM : VisualizationViewModel) {
    this.searchProvider = new FilterService();
    this.selectedIds = new Set();
    this.selectedItems = new Array();
    this.filterValueChanged = new EventEmitter();
  }

  private filterContext: Filters;
  public get FilterContext(): Filters {
    return this.filterContext;
  }

  @Input() public set FilterContext(value: Filters) {
    this.filterContext = Object.assign(new Filters(), value);

    if (this.filterContext.FilterType == 'Enum') {
      this.searchBox_enterKeyPress(null);
    }

    if (this.filterContext.Filters == null) {
      this.SubFilterString = "";
    }
  }

  /**
   * null means that the control needs to be disabled un till a 
   * subFilterString is set, empty means that the control is 
   * independent of sub filters. And when it has param information
   * it'll be added to the URL for search 
   */
  private subFilterString: string = null;
  public get SubFilterString(): string {
    return this.subFilterString;
  }
  public set SubFilterString(value: string) {
    this.subFilterString = value;
  }

  /**
   * It controls the visibility of `spinner`, `error state`, based on `ViewStateEnum`
   */
  private visualState: BehaviorSubject<ViewStateEnum> = new BehaviorSubject<ViewStateEnum>(null);
  public get VisualState(): BehaviorSubject<ViewStateEnum> {
    return this.visualState;
  }

  private itemSource: BehaviorSubject<Array<FilterSuggestionModel>> = new BehaviorSubject<Array<FilterSuggestionModel>>([]);
  public get ItemSource(): BehaviorSubject<Array<FilterSuggestionModel>> {
    return this.itemSource;
  }
  public set ItemSource(value: BehaviorSubject<Array<FilterSuggestionModel>>) {
    let others = value.getValue().filter(x => !this.selectedIds.has(x.ContentId));
    let mergedSource = this.selectedItems.concat(others);
    this.itemSource.next(mergedSource);
  }

  get ViewState() {
    return ViewStateEnum;
  }
  ngOnInit() { }

  async searchBox_enterKeyPress(event: any) {

    this.visualState.next(ViewStateEnum.Loading)

    let queryString: string;

    if (event)
      queryString = event.value ? event.value : event.target.value;

    let searchResponse: Array<FilterSuggestionModel> = this.FilterContext.FilterType == 'Search' ?
      await this.searchProvider.Search(this.FilterContext.SearchSource, queryString, this.SubFilterString) :
      this.searchProvider.SearchLocal(this.FilterContext.PossibleValues, queryString);
    if (searchResponse == null) {

      this.visualState.next(ViewStateEnum.NoContent)

      setTimeout(() => {
        this.visualState.next(ViewStateEnum.Loaded);
      }, 2000);

    }

    let searchData: Array<FilterSuggestionModel> = [];

    if (!Array.isArray(searchResponse) || !searchResponse.length)
      return;

    searchResponse.forEach((element) => {
      searchData.push(Object.assign(new FilterSuggestionModel(), element));
    })

    this.ItemSource = new BehaviorSubject<Array<FilterSuggestionModel>>(searchData);

    this.visualState.next(ViewStateEnum.Loaded);
  }

  itemSelectionChanged(changedValue: FilterSuggestionModel) {

    if (changedValue.IsSelected) {
      this.selectedIds.add(changedValue.ContentId);
      this.selectedItems.push(changedValue);
    } else {
      this.selectedIds.delete(changedValue.ContentId);
      this.selectedItems.splice(this.selectedItems.indexOf(changedValue), 1);
    }

    let paramString: string = this.selectedIds.size < 1 ? null :
      `${Array.from(this.selectedIds).join(",")}`;

    let obj: Map<string, string> = new Map<string, string>();
    obj.set("key", this.FilterContext.ParamName)
    obj.set("value", paramString)
    this.filterValueChanged.emit(obj);
  }

  itemClicked(value: FilterSuggestionModel, event: any) {
    event.stopPropagation();
    value.IsSelected = !value.IsSelected;
    let selectedId: string;
    if (value.IsSelected) {
      selectedId = value.ContentId;
      event.target.classList.add('activeItem');
      var links = document.querySelectorAll('.' + 'activeItem');
      for (var i = 0; i < links.length; i++) {
        if (event && links[i] === event.target) continue;
        links[i].classList.remove('activeItem');
      }
    }
    else {
      selectedId = ''
      event.target.classList.remove('activeItem');
    };

    let paramString: string = `${this.FilterContext.ParamName}=${selectedId}`;

    let obj: Map<string, string> = new Map<string, string>();
    obj.set("key", this.FilterContext.ParamName)
    obj.set("value", paramString)
    this.filterValueChanged.emit(obj);

  }

  SubFilterChanged(filterParam: string) {
    this.SubFilterString = filterParam;
  }

}
