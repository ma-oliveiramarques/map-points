import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  DocumentReference,
} from 'firebase/firestore';
import { db } from 'firebase';
import { IPoint } from '../interfaces/point';

const mockedPoints = [
  {
    id: "1",
    lat: "-8.62597171350884",
    long: "40.86669099337182",
    name: "Ovar, Portugal",
    color: "#006400"
  }, 
  {
    id: "2",
    lat: "-3.704953086665833",
    long: "40.42741629677429",
    name: "Madrid, Espanha",
    color: "#8B0000"
  },
  {
    id: "3",
    lat: "-77.79439451189849",
    long: "34.22011161652749",
    name: "Wrightsville Beach, USA",
    color: "#FFFF00"
  },
  {
    id: "4",
    lat: "34.832266435574674",
    long: "-19.733360773134624",
    name: "Cidade da Beira, Moçambique",
    color: "#00FFFF"
  }
]

async function insertPoint(point: IPoint): Promise<DocumentReference<T>> {

  await setDoc(doc(db, "points", "1"), mockedPoints);
  return DocumentReference<T>;
}


async function deletePoint(point: IPoint): Promise<void> {
  await deleteDoc(doc(db, 'points', 'point'));
}

async function getPoint(point: IPoint): Promise<DocumentSnapshot<T>> {
  const docRef = doc(db, 'points', 'point');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }

  return DocumentSnapshot<T>;
}

async function getPointsList(point: IPoint): Promise<QuerySnapshot<T>> {
  const querySnapshot = await getDocs(collection(db, 'cities'));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
  });

  return QuerySnapshot<T>;
}
