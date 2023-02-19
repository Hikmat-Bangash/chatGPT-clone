
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFr6wFmvqwohd25PAB50JCRSKgVASGdXs",
    authDomain: "chatgpt-270ce.firebaseapp.com",
    projectId: "chatgpt-270ce",
    storageBucket: "chatgpt-270ce.appspot.com",
    messagingSenderId: "1064902994026",
    appId: "1:1064902994026:web:f96fcfde313d47e58ac213"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app: any = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}