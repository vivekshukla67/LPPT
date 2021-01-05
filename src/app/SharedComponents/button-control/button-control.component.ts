import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Filters } from '../filter-control/Models/FilterModel';

@Component({
  selector: 'app-button-control',
  templateUrl: './button-control.component.html',
  styleUrls: ['./button-control.component.scss']
})
export class ButtonControlComponent implements OnInit {

  @Output() filterValueChanged: EventEmitter<Map<string, string>>;

  constructor() { this.filterValueChanged = new EventEmitter(); }

  private filterContext: Filters;
  public get FilterContext(): Filters { return this.filterContext; }

  @Input() public set FilterContext(value: Filters) { this.filterContext = value; }

  ngOnInit() { }

  buttonClicked() {
    let obj: Map<string, string> = new Map<string, string>();
    obj.set("filterName", this.FilterContext.FilterName)
    obj.set("filterType", this.FilterContext.FilterType)
    obj.set("action", this.FilterContext.Action)
    obj.set("trigger", this.FilterContext.Trigger)
    this.filterValueChanged.emit(obj);
  }

}