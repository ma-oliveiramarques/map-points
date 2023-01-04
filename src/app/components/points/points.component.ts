import { Component } from '@angular/core';
import { IPoint } from 'src/app/interfaces/point';
import { PointsService } from 'src/app/services/points.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent {

  pointsInserted: IPoint[];
  pointIdToDelete: string;
  pointIdToGet: string;

  constructor(
    private pointsService: PointsService,
    private snackBarService: SnackBarService,
  ) {
    this.pointsInserted = [];
    this.pointIdToDelete = '';
    this.pointIdToGet = '';
  }


  async createPoint(): Promise<void> {
    const mockedPoints: IPoint[] = [
      {
        id: "1",
        lat: -8.62597171350884,
        long: 40.86669099337182,
        name: "Ovar, Portugal",
        color: "#006400"
      }, 
      {
        id: "2",
        lat: -3.704953086665833,
        long: 40.42741629677429,
        name: "Madrid, Espanha",
        color: "#8B0000"
      },
      {
        id: "3",
        lat: -77.79439451189849,
        long: 34.22011161652749,
        name: "Wrightsville Beach, USA",
        color: "#FFFF00"
      },
      {
        id: "4",
        lat: 34.832266435574674,
        long: -19.733360773134624,
        name: "Cidade da Beira, Moçambique",
        color: "#00FFFF"
      }
    ];


    try {
      const nextPoint: IPoint = mockedPoints.filter((p: IPoint) => !this.pointsInserted.some((pi: IPoint) => pi === p.id))[0];

      await this.pointsService.insertPoint(nextPoint);
      this.pointsInserted.push(nextPoint);
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
  }

  async getPoint(): Promise<void> {
    if (!this.pointIdToGet){
      this.snackBarService.show('Please, type the Point ID before you submit', 'Close');
      return;
    }

    const myPoint = await this.pointsService.getPoint(this.pointIdToGet);
    console.log(myPoint);
  }

  async getPointsList(): Promise<void> {
    const myList = await this.pointsService.getPointsList();
    console.log(myList);
  }
}
