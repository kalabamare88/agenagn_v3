// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTri36XAOWqQw_EPmrtQ8Krgg1j9H0RTU",
  authDomain: "phone-validation-cb350.firebaseapp.com",
  projectId: "phone-validation-cb350",
  storageBucket: "phone-validation-cb350.appspot.com",
  messagingSenderId: "1078133630672",
  appId: "1:1078133630672:web:48a63bc5308c5c7c8da0d5"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
