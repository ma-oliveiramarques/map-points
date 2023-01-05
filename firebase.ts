// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyClwf_csTgID7Zf5-XI4iKBW7q-CJf8BAw',
  authDomain: 'map-points-app.firebaseapp.com',
  projectId: 'map-points-app',
  storageBucket: 'map-points-app.appspot.com',
  messagingSenderId: '661098545243',
  appId: '1:661098545243:web:3298e0c4cbcca610827f7e',
};

// Initialize Firebase and Firestore
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
