import { Component, Input, OnChanges } from '@angular/core';
import { IPoint } from 'src/app/interfaces/point';
import { PointsComponent } from '../points/points.component';

@Component({
  selector: 'app-point-table',
  templateUrl: './point-table.component.html',
  styleUrls: ['./point-table.component.css'],
})
export class PointTableComponent extends PointsComponent implements OnChanges {
  
  @Input() pointsList: IPoint[];
  PointsComponent: PointsComponent;

  ngOnChanges() {}

  override id: string;
  override long: number;
  override lat: number;
  override color: string;
  override name: string;

  displayedColumns: string[] = ['id', 'name', 'long', 'lat', 'color', 'delete'];
}
