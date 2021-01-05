import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, Output, EventEmitter, ViewContainerRef, ComponentFactoryResolver, Type, AfterViewInit, AfterContentChecked, DoCheck, AfterContentInit } from '@angular/core';
import { OverFlowStrategy, AlignmentStrategy } from 'src/app/shared/Enums/Enums';
import { BehaviorSubject, of } from 'rxjs';
import { ICommandBarControl } from './ICommandBarControl';
import { FilterControlComponent } from '../filter-control/filter-control.component';
import { Filters } from '../filter-control/Models/FilterModel';
import { DateFilterControlComponent } from '../date-filter-control/date-filter-control.component';
import { OverflowFilterControlComponent } from '../overflow-filter-control/overflow-filter-control.component';
import { ButtonControlComponent } from '../button-control/button-control.component';
import { FeatureAccessService } from 'src/app/shared/Services/FeatureAccessService';

@Component({
  selector: 'app-command-bar-filter',
  templateUrl: './command-bar-filter.component.html',
  styleUrls: ['./command-bar-filter.component.scss'],
  entryComponents: [FilterControlComponent, DateFilterControlComponent, ButtonControlComponent, OverflowFilterControlComponent]
})
export class CommandBarFilterComponent implements OnInit {

  ngOnInit() {}

  ngAfterViewInit() {
    // set width of currently loaded screen
    this.defaultOffsetWidth = this.elementView.nativeElement.offsetWidth;
    this.distributer();
  }
  /**
   * For left right buttons
   */
  @ViewChild('mainScreen', { static: false, read: ElementRef }) public widgetsContent: ElementRef<any>;

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 200), behavior: 'smooth' });
    if (this.widgetsContent.nativeElement.scrollLeft % 200 != 0)
      this.rightScroll = false;
    this.leftScroll = this.widgetsContent.nativeElement.scrollLeft > 0 ? true : false;
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 200), behavior: 'smooth' });
    this.leftScroll = this.widgetsContent.nativeElement.scrollLeft != 0 ? true : false;
    this.rightScroll = true;
  }

  private defaultOffsetWidth = 0;
  @HostListener('window:resize', ['$event']) sizeChange(event) {
    if (this.defaultOffsetWidth != this.elementView.nativeElement.offsetWidth) {

      // To Update the default width of filter so that distributer only runs on width change and not on height change
      this.defaultOffsetWidth = this.elementView.nativeElement.offsetWidth
      this.distributer();
    }
  }

  @ViewChild('mainScreen', { static: true }) elementView: ElementRef;

  // Setup custom viewChild here
  @ViewChild('filterControl', { static: false, read: ViewContainerRef }) filterContainerRef: ViewContainerRef;
  @ViewChild('overflowFilterControl', { static: false, read: ViewContainerRef }) overflowFilterContainerRef: ViewContainerRef;

  @Output() private queryParamValueChanged: EventEmitter<Map<string, string>>;

  private stdHMenuBtnWidth: number = 150;
  private hMenuItemCount: number;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    public featureAccessService: FeatureAccessService) {
    this.queryParamValueChanged = new EventEmitter();
  }

  private cBarStrategy: OverFlowStrategy = OverFlowStrategy.HorizontalOverflow;
  public get CBarStrategy(): OverFlowStrategy {
    return this.cBarStrategy;
  }

  @Input() public set CBarStrategy(value: OverFlowStrategy) {

    if (value != null || undefined)
      this.cBarStrategy = value;

    if (this.cBarStrategy === OverFlowStrategy.HorizontalOverflow)
      this.elementView.nativeElement.classList.add('scroll');

    if (this.cBarStrategy === OverFlowStrategy.Menu)
      this.elementView.nativeElement.classList.remove('scroll');

  }

  private configuration: AlignmentStrategy = AlignmentStrategy.Right;
  public get Configuration(): AlignmentStrategy {
    return this.configuration;
  }

  @Input() public set Configuration(value: AlignmentStrategy) {
    if (value)
      this.configuration = value;
  }

  private filterArray: Array<object> = [];
  public get FilterArray(): Array<object> {
    return this.filterArray;
  }
  @Input() public set FilterArray(value: Array<object>) {
    this.filterArray = value.filter(x => !x['feature'] || this.featureAccessService.ValidateFeatureSet(x['feature']));
    this.distributer();
  }

  private horizontalMenu: BehaviorSubject<Array<object>> = new BehaviorSubject<Array<object>>([]);
  public get HorizontalMenu(): BehaviorSubject<Array<object>> {
    return this.horizontalMenu
  }
  public set HorizontalMenu(value: BehaviorSubject<Array<object>>) {
    this.horizontalMenu.next(value.getValue());

    this.initializeHorizontalFilterControl();

  }

  private verticalFilter: BehaviorSubject<Array<object>> = new BehaviorSubject<Array<object>>([]);
  public get VerticalFilter(): BehaviorSubject<Array<object>> {
    return this.verticalFilter
  }
  public set VerticalFilter(value: BehaviorSubject<Array<object>>) {
    this.verticalFilter.next(value.getValue());

    this.initializeVerticalFilterControl();

  }

  private verticalMenu: BehaviorSubject<Array<object>> = new BehaviorSubject<Array<object>>([]);
  public get VerticalMenu(): BehaviorSubject<Array<object>> {
    return this.verticalMenu;
  }
  public set VerticalMenu(value: BehaviorSubject<Array<object>>) {
    this.verticalMenu.next(value.getValue());

    // TODO: remove setTimeout from everywhere
    if (this.VerticalMenu.getValue().length > 0)
      setTimeout(() => { this.initializeOverFlowFilterControl(); }, 0);
  }

  private dateFilter: BehaviorSubject<Array<object>> = new BehaviorSubject<Array<object>>([]);
  public get DateFilter(): BehaviorSubject<Array<object>> {
    return this.dateFilter;
  }
  public set DateFilter(value: BehaviorSubject<Array<object>>) {
    this.dateFilter.next(value.getValue());
  }

  distributer() {
    switch (this.CBarStrategy) {
      case OverFlowStrategy.Menu:
        setTimeout(() => {
          this.menu();
        }, 0)
        break;
      case OverFlowStrategy.HorizontalOverflow:
        this.horizontalOverFlow();
        break;
      case OverFlowStrategy.VerticalOverflow:
        setTimeout(() => {
          this.verticalOverFlow();
        }, 0)
        break;
      default:
        throw Error("OverFlowStrategy not implemented !");
    }
  }

  leftScroll: boolean = false;
  rightScroll: boolean = false;
  horizontalOverFlow() {
    this.rightScroll = false;
    if (this.FilterArray && Math.ceil(this.elementView.nativeElement.offsetWidth / this.stdHMenuBtnWidth) < this.FilterArray.length) {
      this.leftScroll = false; this.rightScroll = true;
    }

    let _castedData: Filters[] = [];

    if (!this.FilterArray)
      return;

    this.FilterArray.forEach((item) => { _castedData.push(Object.assign(new Filters(), item)); });

    this.HorizontalMenu = new BehaviorSubject<Filters[]>(_castedData);
  }

  verticalOverFlow() {
    let _castedData: Filters[] = [];
    if (!this.FilterArray)
      return;
    this.FilterArray.forEach((item) => { _castedData.push(Object.assign(new Filters(), item)); })
    // let hMenuItem: Array<object> = _castedData.slice(0, this.hMenuItemCount);
    this.VerticalFilter = new BehaviorSubject<Array<object>>(_castedData);
  }

  /**
   * TODO:-- menu option implementation in on hold.
   */
  menu() {
    let _castedData: Filters[] = [];
    if (!this.FilterArray)
      return;

    this.hMenuItemCount = Math.floor(this.elementView.nativeElement.offsetWidth / this.stdHMenuBtnWidth);
    this.FilterArray.forEach((item) => { _castedData.push(Object.assign(new Filters(), item)); });

    let hMenuItem: Array<object> = _castedData.slice(0, this.hMenuItemCount);
    this.HorizontalMenu = new BehaviorSubject<Array<object>>(hMenuItem);

    let vMenuItem: Array<object> = _castedData.slice(this.hMenuItemCount, this.FilterArray.length);
    this.VerticalMenu = new BehaviorSubject<Array<object>>(vMenuItem);
  }

  private initializeHorizontalFilterControl() {

    this.filterContainerRef.clear()

    this.HorizontalMenu.getValue().forEach((fil: Filters) => {
      let _component: Type<any> = FilterControlComponent;
      if (fil.FilterType === "Date")
        _component = DateFilterControlComponent;

      if (fil.FilterType === "Button")
        _component = ButtonControlComponent;

      const controlToAddFactory = this.componentFactoryResolver.resolveComponentFactory(_component);
      const controlRef = this.filterContainerRef.createComponent(controlToAddFactory);
      controlRef.instance.FilterContext = fil;

      /**
       * Subscribe filter control emitter 
       */
      controlRef.instance.filterValueChanged.subscribe(queryParam => this.queryParamValueChanged.emit(queryParam));
    });

  }

  private initializeVerticalFilterControl() {

    this.filterContainerRef.clear();

    this.VerticalFilter.getValue().forEach((fil: Filters) => {
      let _component: Type<any> = FilterControlComponent;
      if (fil.FilterType === "Date")
        _component = DateFilterControlComponent;

      if (fil.FilterType === "Button")
        _component = ButtonControlComponent;

      const controlToAddFactory = this.componentFactoryResolver.resolveComponentFactory(_component);
      const controlRef = this.filterContainerRef.createComponent(controlToAddFactory);
      controlRef.instance.FilterContext = fil;

      /**
       * Subscribe filter control emitter 
       */
      controlRef.instance.filterValueChanged.subscribe(queryParam =>{ 
        this.queryParamValueChanged.emit(queryParam)});
    });

  }

  private async initializeOverFlowFilterControl() {

    if (!this.overflowFilterContainerRef)
      return;

    this.overflowFilterContainerRef.clear();
    this.VerticalMenu.getValue().forEach((fil: Filters) => {
      let _component: Type<any> = OverflowFilterControlComponent;

      if (fil.FilterType === "Date")
        _component = DateFilterControlComponent;

      if (fil.FilterType === "Button")
        _component = ButtonControlComponent;

      const controlToAddFactory = this.componentFactoryResolver.resolveComponentFactory(_component);
      const controlRef = this.overflowFilterContainerRef.createComponent(controlToAddFactory);
      controlRef.instance.FilterContext = fil;

      controlRef.instance.filterValueChanged.subscribe(queryParam => this.queryParamValueChanged.emit(queryParam));
    })
  }

}
