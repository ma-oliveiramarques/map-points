import { collection, doc, setDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore';
import { db } from 'firebase';
import { IPoint } from '../interfaces/point';
import { Injectable } from '@angular/core';
import { SnackBarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class PointsService {
  pointDocumentName: string;

  constructor(public snackBarService: SnackBarService) {
    this.pointDocumentName = 'points';
  }

  // insert or update one point in Firebase database
  async insertPoint(point: IPoint): Promise<void> {
    try {
      const myDoc = doc(db, this.pointDocumentName, point.id);
      await setDoc(myDoc, point);
    } catch (err) {
      this.snackBarService.show('One error occurred', 'Close');
    }
  }

  // delete one point from the list by it's id
  async deletePoint(pointId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.pointDocumentName, pointId));
    } catch (err) {
      this.snackBarService.show('One error occurred', 'Close');
    }
  }

  async getPoint(pointId: string): Promise<IPoint | undefined> {
    let pointToReturn: IPoint | undefined = undefined;

    try {
      const docRef = doc(db, this.pointDocumentName, pointId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data() as IPoint;

        pointToReturn = {
          id: docSnap.id,
          lat: docData.lat,
          long: docData.long,
          name: docData.name,
          color: docData.color,
        };
      } else {
        this.snackBarService.show("There's no point with the given id", 'Close');
      }
    } catch (err) {
      this.snackBarService.show('One error occurred', 'Close');
    }
    return pointToReturn;
  }

  async getPointsList(): Promise<IPoint[]> {
    let pointsToReturn: IPoint[] = [];

    try {
      const querySnapshot = await getDocs(collection(db, this.pointDocumentName));

      querySnapshot.forEach((doc) => {
        const docData = doc.data() as IPoint;

        const newPointToReturn: IPoint = {
          id: doc.id,
          lat: docData.lat,
          long: docData.long,
          name: docData.name,
          color: docData.color,
        };

        pointsToReturn.push(newPointToReturn);
      });
    } catch (err) {
      this.snackBarService.show('One error occurred', 'Close');
    }

    return pointsToReturn;
  }
}
