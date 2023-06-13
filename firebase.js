// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH6wOhkjwAvUNNzoJ0WBIswOSo2M6YCm0",
  authDomain: "expo-test-64bd5.firebaseapp.com",
  projectId: "expo-test-64bd5",
  storageBucket: "expo-test-64bd5.appspot.com",
  messagingSenderId: "293034357998",
  appId: "1:293034357998:web:b43a24bd101c381615efff",
  measurementId: "G-MPZE2DZCNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();
