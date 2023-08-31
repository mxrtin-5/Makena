// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiAhSR7bKM8oQPTuS2saIVwvOVrogBvKo",
    authDomain: "makena-28e6e.firebaseapp.com",
    projectId: "makena-28e6e",
    storageBucket: "makena-28e6e.appspot.com",
    messagingSenderId: "537447558178",
    appId: "1:537447558178:web:96ba22e6b518eb81e86e7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
