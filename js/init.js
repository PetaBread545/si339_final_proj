// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Firebase configuration for your project
const firebaseConfig = {
    apiKey: "AIzaSyAidhG9aOtiR1GPmcicMKC2uzFOI5SvSQ0",
    authDomain: "si339final.firebaseapp.com",
    projectId: "si339final",
    storageBucket: "si339final.appspot.com",
    messagingSenderId: "871224604451",
    appId: "1:871224604451:web:3077444f5cccbcfcd3be96",
    measurementId: "G-SXWP24X75P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

export default {app, database};