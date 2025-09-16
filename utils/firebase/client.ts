// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjbFSkxVKjXSRskj0m9R7PROgDdnz6Nzo",
    authDomain: "doinfine-v0.firebaseapp.com",
    projectId: "doinfine-v0",
    storageBucket: "doinfine-v0.firebasestorage.app",
    messagingSenderId: "955137499372",
    appId: "1:955137499372:web:c8c592457883a518f945c9",
    measurementId: "G-FMEK5PY9YF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);