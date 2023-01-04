import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { IPoint } from 'src/app/interfaces/point';
import { PointsService } from 'src/app/services/points.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  map: mapboxgl.Map;
  geojson: any;

  constructor(
    private pointsService: PointsService,
  ) {

  }

async ngOnInit(){
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoibWFyLW9saXZtYXJxdWVzIiwiYSI6ImNsY2R6enJ1eTAzZHozcHRhMzc1YXNndncifQ.IttFxmQ0ZzK1WlkMTH5C-w',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12', 
      center: [-27.072531336524897, 31.9504425657866],
      zoom: 1.7
    });

    await this.assemblePoints();
    this.drawPoints();

  }

  async assemblePoints(): Promise<void> {
    const allPoints = await this.pointsService.getPointsList();

    this.geojson = {
      type: 'FeatureCollection',
      features: []
    }

    allPoints.forEach((p: IPoint) => {

      const newFeature = {
        type: 'Feature',
        properties: {
          message: p.name,
          color: p.color,
          iconSize: [15, 15]
        },
        geometry: {
          type: 'Point',
          coordinates: [p.long, p.lat]
        }
      }
      this.geojson.features.push(newFeature);
    })
  }

  drawPoints(): void {
    for (const marker of this.geojson.features) {
      const { iconSize, color, message } = marker.properties;

      // Create a DOM element for each marker
      const div = document.createElement('div');
      const width = iconSize[0];
      const height = iconSize[1];
      div.className = 'marker';
      div.style.backgroundColor = color;
      div.style.width = `${width}px`;
      div.style.height = `${height}px`;
      div.style.borderRadius = '50%';
      div.style.backgroundSize = '100%';

      div.addEventListener('click', () => {
        window.alert(message)
      })

      // Add markers to the map
      new mapboxgl.Marker(div)
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
    }
  }

}
