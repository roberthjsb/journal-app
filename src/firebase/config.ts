
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries





const firebaseConfig =
{
  apiKey: process.env.VITE_API_APIKEY,
  authDomain: process.env.VITE_API_AUTHDOMAIN,
  projectId: process.env.VITE_API_PROJECTID,
  storageBucket: process.env.VITE_API_STORAGEBUCKET,
  messagingSenderId: process.env.VITE_API_MESSAGINGSENDERID,
  appId: process.env.VITE_API_APPID,
}
  ;
// Initialize Firebase
export const FireabaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FireabaseApp);
export const FirebaseDB = getFirestore(FireabaseApp);