import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponent, GridsterPush, GridType } from 'angular-gridster2';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {

  constructor() { }

  width: number = window.innerWidth;

  public FilterList: Array<object>;
  myInnerHeight: number;
  options: GridsterConfig;
  dashboard: BehaviorSubject<Array<GridsterItem>> = new BehaviorSubject<Array<GridsterItem>>([]) ;
  itemToPush: GridsterItemComponent;

  disableDrag = true;

  timePeriods = [
    { name: 'Filter', width: 20 },
    { name: 'Dashboard', width: 80 }
  ];
  onResize() {
    this.width = window.innerWidth;
  }

  ngOnInit() {
    this.onResize();
    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.None,
      displayGrid: DisplayGrid.None,
      pushItems: true,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: false
      }
    };

    const tempData = '{"dashboardId":"031aea32-b65a-4376-a0f1-53b7fcbf8a97","name":"Port Connectivity","description":"contains village and road and railway route connectivity","dashboardfilters":[{"filterGroup":"MapLayer","filterGroupName":"Map Layer Filter","filterScope":["Global","Local"],"linkedWidgets":["233ea5ab-46c8-4ac4-a30e-b9afa1e12a16"],"filters":[{"filterName":"Administrative","paramName":"query","filterType":"Enum","filterOrder":0,"possibleValues":[{"entityName":"State","entityId":"state","defaultSelected":true},{"entityName":"District","entityId":"district","defaultSelected":false},{"entityName":"City","entityId":"city","defaultSelected":false},{"entityName":"Town","entityId":"city","defaultSelected":false},{"entityName":"Village","entityId":"village","defaultSelected":false},{"entityName":"Pin","entityId":"pin","defaultSelected":false}],"searchSource":"<The source url for the respective filter search>","selectMany":true},{"filterName":"Industrial Cluster","paramName":"query","filterType":"Enum","filterOrder":1,"possibleValues":[{"entityName":"Coal","entityId":"coal","defaultSelected":true},{"entityName":"Cement","entityId":"cement","defaultSelected":false},{"entityName":"Steel","entityId":"steel","defaultSelected":false},{"entityName":"Food-Grains","entityId":"foodgrains","defaultSelected":false},{"entityName":"Fertilizers","entityId":"fertilizers","defaultSelected":false},{"entityName":"Iron-ore","entityId":"ironore","defaultSelected":false},{"entityName":"E-commerce","entityId":"ecommerce","defaultSelected":false}],"searchSource":"<The source url for the respective filter search>","selectMany":true}],"placement":{"x_axis":0,"y_axis":0,"rows":2,"cols":12}},{"filterGroup":"queryFilter","filterGroupName":"Query Filter","filterScope":["Global","Local"],"filters":[{"filterName":"Port","paramName":"port","filterType":"dropdown","filterOrder":0,"possibleValues":[{"entityName":"Port 1","entityId":"port1","valuesOrder":1,"defaultSelected":false},{"entityName":"All","entityId":"all","valuesOrder":0,"defaultSelected":true}],"selectMany":false},{"filterName":"Industrial Cluster","paramName":"cluster","filterType":"dropdown","filterOrder":0,"possibleValues":[{"entityName":"Cluster 1","entityId":"cluster1","valuesOrder":1,"defaultSelected":false},{"entityName":"All","entityId":"all","valuesOrder":0,"defaultSelected":true}],"selectMany":false}],"searchSource":"<The source url for the respective filter search>","placement":{"x_axis":0,"y_axis":2,"rows":10,"cols":6}}],"widgets":[{"widgetId":"233ea5ab-46c8-4ac4-a30e-b9afa1e12a16","widgetName":"Port Connectivity Map","widgetType":"MAP","sourceUrl":"<The source url to fetch report processed records for this widget>","icon":"<The icon that should be shown on widget>","filter":"dashboardId IS <dashboardId>","sort":"","projection":"<projection query for data filtering>","supportedActions":["hide&show","minimize","download"],"placement":{"x_axis":12,"y_axis":0,"rows":12,"cols":12},"localFilter":{},"supportedEvents":["Global","Local"]},{"widgetId":"233ea5ab-46c8-4ac4-a30e-b9afa1e12a1923","widgetName":"Data Grid","widgetType":"DATAGRID","sourceUrl":"<The source url to fetch report processed records for this widget>","icon":"<The icon that should be shown on widget>","filter":"dashboardId IS <dashboardId>","sort":"","projection":"<projection query for data filtering>","supportedActions":["hide&show","minimize","download"],"placement":{"x_axis":4,"y_axis":12,"rows":8,"cols":18},"localFilter":{},"supportedEvents":["Local"]}]}';
    const portConSchJSON = JSON.parse(tempData);
    const dashboardArr: any = [];
    const dashboardFiltersJSONArr = portConSchJSON.dashboardfilters;

    dashboardFiltersJSONArr.forEach(obj => {
      const dashboardObj: any = {};
      Object.entries(obj).forEach(([key, value]) => {
            dashboardObj.widgetId = '1wid1';
            dashboardObj.widgetType = 'MapFilter';
            dashboardObj.dragEnabled = false;
            if (key.includes('placement')) {
              dashboardObj.x = obj[key].x_axis;
              dashboardObj.y = obj[key].y_axis;
              dashboardObj.rows = obj[key].rows;
              dashboardObj.cols = obj[key].cols;
            } else {

              dashboardObj[key] = value;
          }
          });
      dashboardArr.push(dashboardObj);
        });


    const widgetsJSONArr = portConSchJSON.widgets;

    widgetsJSONArr.forEach(obj => {
      const dashboardObj: any = {};
      Object.entries(obj).forEach(([key, value]) => {
            dashboardObj.dragEnabled = false;
            if (key.includes('placement')) {
              dashboardObj.x = obj[key].x_axis;
              dashboardObj.y = obj[key].y_axis;
              dashboardObj.rows = obj[key].rows;
              dashboardObj.cols = obj[key].cols;
            } else {
              dashboardObj[key] = value;
          }
          });
      dashboardArr.push(dashboardObj);
        });

    this.dashboard.next(dashboardArr);

  }

  pin(event, flag: boolean) {
    this.dashboard.getValue().forEach((element) => {
      if (element.widgetId === event.widgetId) {
        console.log(flag);
        element.dragEnabled = flag ? false : true;
        console.log(element);
      }
    });
    console.log(this.dashboard);
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.getValue().splice(this.dashboard.getValue().indexOf(item), 1);
  }

  addItem() {
    this.dashboard.getValue().push({ x: 0, y: 0, cols: 1, rows: 1 });
  }

  initItem(item: GridsterItem, itemComponent: GridsterItemComponent) {
    this.itemToPush = itemComponent;
  }

  pushItem() {
    const push = new GridsterPush(this.itemToPush); // init the service
    this.itemToPush.$item.rows += 4; // move/resize your item
    if (push.pushItems(push.fromNorth)) { // push items from a direction
      push.checkPushBack(); // check for items can restore to original position
      push.setPushedItems(); // save the items pushed
      this.itemToPush.setSize();
      this.itemToPush.checkItemChanges(this.itemToPush.$item, this.itemToPush.item);
    } else {
      this.itemToPush.$item.rows -= 4;
      push.restoreItems(); // restore to initial state the pushed items
    }
    push.destroy(); // destroy push instance
    // similar for GridsterPushResize and GridsterSwap
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  }
}

  // this.onResize();
  //   this.FilterList = [{
  //     filterOrder: 0,
  //     filterName: 'Platform',
  //     filterType: 'Enum',
  //     possibleValues: [
  //       {
  //         entityId: "342918jbj2b",
  //         entityName: "Platform1"
  //       },
  //       {
  //         entityId: "74644332fc3c",
  //         entityName: "Platform2"
  //       }
  //     ],
  //     paramName: "groupingIds",
  //     selectMany: true,
  //     status: "Active"
  //   },
  //   {
  //     filterOrder: 1,
  //     filterName: 'API Search',
  //     filterType: 'Search',
  //     possibleValues: null,
  //     paramName: "assetIds",
  //     selectMany: true,
  //     status: "Active",
  //     searchSource: 'https://anchor.mapmyindia.com/api/search/assets?query='
  //   },
  //   {
  //     filterOrder: 2,
  //     filterName: 'Link Keys',
  //     filterType: 'Button',
  //     selectMany: false,
  //     status: "Active",
  //     action: "PopUp",
  //     trigger: "LinkKeys",
  //     feature: "anchor.projects.migrateAccounts"
  //   },
  //   {
  //     filterOrder: 3,
  //     filterName: 'Generate JWT',
  //     filterType: 'Button',
  //     selectMany: false,
  //     status: "Active",
  //     action: "APICall",
  //     trigger: "GenerateJWT"
  //   },
  //   {
  //     filterOrder: 4,
  //     filterName: 'Auth Type',
  //     filterType: 'Enum',
  //     possibleValues: null,
  //     paramName: "groupFilter",
  //     selectMany: true,
  //     status: "Active"
  //   },
  //   {
  //     filterOrder: 5,
  //     filterName: 'Add New Device',
  //     filterType: 'Button',
  //     status: "Active",
  //     trigger: 'AddDevice',
  //     action: "Route",
  //   },
  //   {
  //     filterOrder: 6,
  //     filterName: 'Upload CSV',
  //     filterType: 'Button',
  //     status: "Active",
  //     trigger: "UploadCSV",
  //     action: "PopUp"
  //   }]
  // }

  // onResize() {
  //   this.myInnerHeight = window.innerHeight - 210;
  // }

  // public get Strategy() { return OverFlowStrategy; }

  // public get AlignmentStrategy() { return AlignmentStrategy; }

  // public setQueryParam(event) {

  // }
