import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  public ngOnInit(){
    const map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoibWFyLW9saXZtYXJxdWVzIiwiYSI6ImNsY2R6enJ1eTAzZHozcHRhMzc1YXNndncifQ.IttFxmQ0ZzK1WlkMTH5C-w',
      container: 'map',
      // Replace YOUR_STYLE_URL with your style URL.
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [-27.072531336524897, 31.9504425657866],
      zoom: 1.7
    });
  }
}
