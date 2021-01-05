import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

declare var MapmyIndia: any; // Declaring Mapmyindia
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  map = L.map
  ngOnInit() {
    this.map = new MapmyIndia.Map(document.getElementById('map'),
    {
        center: [20.59, 78.96],
        zoom: 4
    });
  }

}
