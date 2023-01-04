import { Component } from '@angular/core';
import { IPoint } from 'src/app/interfaces/point';
import { PointsService } from 'src/app/services/points.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { mockedPoints } from 'src/app/data/mocked-points';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent {

  pointsInserted: IPoint[];
  pointIdToDelete: string;
  pointIdToGet: string;
  mockedPoints: IPoint[];

  constructor(
    private pointsService: PointsService,
    private snackBarService: SnackBarService,
  ) {
    this.pointsInserted = [];
    this.pointIdToDelete = '';
    this.pointIdToGet = '';
    this.mockedPoints= mockedPoints;
    
  }

// const mockedPoints: IPoint[] = 
  async createPoint(): Promise<void> {

    try {
      const nextPoint: IPoint = this.mockedPoints.filter((p: IPoint) => !this.pointsInserted.some((pi: IPoint) => pi.id === p.id))[0];

      await this.pointsService.insertPoint(nextPoint);
      this.pointsInserted.push(nextPoint);
      this.snackBarService.show("Point created successfully", "Close");
    }
    catch (err) {
      this.snackBarService.show('One error occurred', 'Close')
    }
  }

  async deletePoint(): Promise<void> {
    if(!this.pointIdToDelete){
      this.snackBarService.show('Please, type the Point ID before you submit', 'Close');
      return;
    }

    await this.pointsService.deletePoint(this.pointIdToDelete);
    this.snackBarService.show('Point deleted successfully', 'Close');
  }

  async getPoint(): Promise<void> {
    if (!this.pointIdToGet){
      this.snackBarService.show('Please, type the Point ID before you submit', 'Close');
      return;
    }

    const myPoint = await this.pointsService.getPoint(this.pointIdToGet);
    console.log(myPoint);
    
    // Create a DOM element
    const div = document.getElementById('show-point');
    const width = 600;
    const height = 300;
    const p = document.createElement('p');
    p.innerHTML = `Point ID: ${this.pointIdToGet}` + '<br>' 
                  + `Name: ${this.mockedPoints[myPoint - 1].name}` + '<br>'
                  + `Longitude: ${this.mockedPoints[myPoint - 1].long}` + '<br>'
                  + `Latitude: ${this.mockedPoints[myPoint - 1].lat}`;
    div?.appendChild(p);
  
    div.style.backgroundColor = this.mockedPoints[this.pointIdToGet - 1].color;
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.backgroundSize = '100%';
  }

  async getPointsList(): Promise<void> {
    const myList = await this.pointsService.getPointsList();
    console.log(myList);
  }
}
