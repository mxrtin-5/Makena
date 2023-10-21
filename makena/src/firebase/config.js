// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrvlryYTuCjWQRpAjP9DdmDdyP1qI6VOo",
    authDomain: "makena-ca1e5.firebaseapp.com",
    projectId: "makena-ca1e5",
    storageBucket: "makena-ca1e5.appspot.com",
    messagingSenderId: "507629284994",
    appId: "1:507629284994:web:ffdace924bc4f57c670e9b",
    measurementId: "G-TBYFWRYTQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
