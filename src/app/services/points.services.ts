import { collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "firebase";
import { IPoint } from "../interfaces/point";
import { doc, deleteDoc } from "firebase/firestore";


async function insertPoint(point : IPoint):Promise<DocumentReference<T>> {


}

async function deletePoint(point : IPoint):Promise<void>{
  await deleteDoc(doc(db, "cities", "DC"));
}
