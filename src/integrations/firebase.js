import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCIBSCO_SEdgkXSn6ntvzHBV379nOwtZAQ",
  authDomain: "tarea-6-1c8bb.firebaseapp.com",
  projectId: "tarea-6-1c8bb",
  storageBucket: "tarea-6-1c8bb.appspot.com",
  messagingSenderId: "891221289167",
  appId: "1:891221289167:web:45790fb490d69f65b72fba",
  measurementId: "G-TQ2J03GY79"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);