import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IPoint } from 'src/app/interfaces/point';
import { PointsService } from 'src/app/services/points.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css'],
})
export class PointsComponent {
  pointIdToDelete: string;
  pointIdToGet: string;

  // Create point form data
  id: string;
  long: number;
  lat: number;
  color: string;
  name: string;

  singlePointData: IPoint[];
  allPointsData: IPoint[];

  constructor(private pointsService: PointsService, private snackBarService: SnackBarService) {
    this.pointIdToDelete = '';
    this.pointIdToGet = '';

    this.id = '';
    this.long = 0;
    this.lat = 0;
    this.color = '#000000';
    this.name = '';

    this.singlePointData = [];
    this.allPointsData = [];
  }

  /**
   *
   * @returns true if all the fields are filled, otherwise false
   */
  validateInput(): boolean {
    if (!this.id || !this.long || !this.lat || !this.name) {
      return false;
    }
    return true;
  }

  async createPoint(): Promise<void> {
    if (!this.validateInput()) {
      this.snackBarService.show('Please, fill all the fields before submit', 'Close');
      return;
    }

    const pointToCreate: IPoint = {
      id: this.id,
      long: this.long,
      lat: this.lat,
      color: this.color,
      name: this.name,
    };

    await this.pointsService.insertPoint(pointToCreate);
    this.snackBarService.show('Point created successfully', 'Close');
  }

  async deletePoint(pointId: string): Promise<void> {
    if (!pointId) {
      this.snackBarService.show('Please, type the Point ID before you submit', 'Close');
      return;
    }

    await this.pointsService.deletePoint(pointId);
    this.snackBarService.show('Point deleted successfully', 'Close');
  }

  async getPoint(): Promise<void> {
    if (!this.pointIdToGet) {
      this.snackBarService.show('Please, type the Point ID before you submit', 'Close');
      return;
    }

    const myPoint = await this.pointsService.getPoint(this.pointIdToGet);

    if (myPoint) {
      this.singlePointData.push(myPoint);
    }
  }

  async getPointsList(): Promise<void> {
    const myList = await this.pointsService.getPointsList();

    if (myList && myList.length > 0) {
      this.allPointsData = myList;
    }
  }
}
