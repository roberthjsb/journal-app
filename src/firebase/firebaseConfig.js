import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC8rdzo358Mna9INsPm8zllaYOcodpDdCs",
    authDomain: "journalapp-7add5.firebaseapp.com",
    databaseURL: "https://journalapp-7add5.firebaseio.com",
    projectId: "journalapp-7add5",
    storageBucket: "journalapp-7add5.appspot.com",
    messagingSenderId: "662384351699",
    appId: "1:662384351699:web:f739ddcd851e3ef947b726"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}
