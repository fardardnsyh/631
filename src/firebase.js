// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.KEY,
    authDomain: "quran-57012.firebaseapp.com",
    projectId: "quran-57012",
    storageBucket: "quran-57012.appspot.com",
    messagingSenderId: "619978269650",
    appId: "1:619978269650:web:67fd4af86995633a419e0b",
    measurementId: "G-1C5R3EDTSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)