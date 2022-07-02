
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqw0l1SYjkV2P2XfPsdKbxV7zfA0TduV4",
  authDomain: "journal-app-adfda.firebaseapp.com",
  projectId: "journal-app-adfda",
  storageBucket: "journal-app-adfda.appspot.com",
  messagingSenderId: "148940594634",
  appId: "1:148940594634:web:676ca7b29b5c3b5e0c4333"
};

// Initialize Firebase
export const FireabaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FireabaseApp);
export const FirebaseDB = getFirestore(FireabaseApp);