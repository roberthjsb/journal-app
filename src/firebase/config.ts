
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_APIKEY,
  authDomain: import.meta.env.VITE_API_AUTHDOMAIN,
  projectId: import.meta.env.VITE_API_PROJECTID,
  storageBucket: import.meta.env.VITE_API_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_API_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_API_APPID,
};
debugger
// Initialize Firebase
export const FireabaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FireabaseApp);
export const FirebaseDB = getFirestore(FireabaseApp);