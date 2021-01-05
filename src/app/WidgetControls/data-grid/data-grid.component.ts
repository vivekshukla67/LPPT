import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  constructor() {

  }
   labels: any;
   dataGridJSONArr: any ;

  ngOnInit() {
    const dummyData = '{"visualization":"BoxPlot","labels":["State","Country","Latitude","Longitude","Active cases"],"seriesCount":1,"supportedVisuals":["VBar","HBar","Pie","DataGrid"],"dataPoints":[[{"State":"Jammu and Kashmir","Country":"India","Latitude":34.29995933,"Longitude":74.46665849,"Active cases":1183},{"State":"Ladakh","Country":"India","Latitude":34.152588,"Longitude":77.577049,"Active cases":43},{"State":"Himachal Pradesh","Country":"India","Latitude":32.084206,"Longitude":77.571167,"Active cases":80},{"State":"Punjab","Country":"India","Latitude":31.51997398,"Longitude":75.98000281,"Active cases":1964},{"State":"Uttarakhand","Country":"India","Latitude":30.0668,"Longitude":79.0193,"Active cases":92},{"State":"Haryana","Country":"India","Latitude":29.238478,"Longitude":76.431885,"Active cases":910},{"State":"Delhi","Country":"India","Latitude":28.704,"Longitude":77.1025,"Active cases":10054},{"State":"Uttar Pradesh","Country":"India","Latitude":26.8479,"Longitude":80.9406,"Active cases":4259},{"State":"Bihar","Country":"India","Latitude":25.0961,"Longitude":85.3131,"Active cases":1262},{"State":"West Bengal","Country":"India","Latitude":22.9786,"Longitude":87.747803,"Active cases":2677},{"State":"Jharkhand","Country":"India","Latitude":23.80039349,"Longitude":86.41998572,"Active cases":223},{"State":"Sikkim","Country":"India","Latitude":27.333303,"Longitude":88.6166475,"Active cases":0},{"State":"Assam","Country":"India","Latitude":26.244156,"Longitude":92.537842,"Active cases":101},{"State":"Arunachal Pradesh","Country":"India","Latitude":28.218,"Longitude":94.7278,"Active cases":1},{"State":"Manipur","Country":"India","Latitude":24.79999,"Longitude":93.950001,"Active cases":7},{"State":"Mizoram","Country":"India","Latitude":23.710398,"Longitude":92.720014,"Active cases":1},{"State":"Nagaland","Country":"India","Latitude":25.6669979,"Longitude":94.11657109,"Active cases":0},{"State":"Tripura","Country":"India","Latitude":23.745127,"Longitude":91.7468,"Active cases":167},{"State":"Madhya Pradesh","Country":"India","Latitude":23.473324,"Longitude":77.947998,"Active cases":4977},{"State":"Odisha","Country":"India","Latitude":20.94092,"Longitude":84.803467,"Active cases":828},{"State":"Chhattisgarh","Country":"India","Latitude":21.295132,"Longitude":81.828232,"Active cases":86},{"State":"Rajasthan","Country":"India","Latitude":27.391277,"Longitude":73.432617,"Active cases":5202},{"State":"Gujarat","Country":"India","Latitude":22.309425,"Longitude":72.13623,"Active cases":11379},{"State":"Telangana","Country":"India","Latitude":17.123147,"Longitude":79.208824,"Active cases":1551},{"State":"Andhra Pradesh","Country":"India","Latitude":14.75043,"Longitude":78.57006,"Active cases":2407},{"State":"Maharashtra","Country":"India","Latitude":19.66382,"Longitude":75.300293,"Active cases":33053},{"State":"Goa","Country":"India","Latitude":15.491997,"Longitude":73.8181,"Active cases":29},{"State":"Karnataka","Country":"India","Latitude":15.317277,"Longitude":75.71389,"Active cases":1147},{"State":"Kerala","Country":"India","Latitude":10.850518,"Longitude":76.27108,"Active cases":601},{"State":"Tamil Nadu","Country":"India","Latitude":11.127123,"Longitude":78.656891,"Active cases":11224},{"State":"Meghalaya","Country":"India","Latitude":25.467,"Longitude":91.3662,"Active cases":1}]]}';
    const dataGridJSON = JSON.parse(dummyData);
    this.labels = dataGridJSON.labels;
    this.dataGridJSONArr = dataGridJSON.dataPoints[0];
    console.log(this.labels);
    console.log(this.dataGridJSONArr);

  }

}
