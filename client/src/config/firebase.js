// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVdIyM2IAhcfYUi-fAYv8XDHjm7nVcRHI",
  authDomain: "socialeyes-d4a0c.firebaseapp.com",
  projectId: "socialeyes-d4a0c",
  storageBucket: "socialeyes-d4a0c.appspot.com",
  messagingSenderId: "59456308820",
  appId: "1:59456308820:web:5e546b9bdbced76ac08fc1",
  measurementId: "G-GFGW1TD507"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth= getAuth(app); 
export const provider= new GoogleAuthProvider();
export const db= getFirestore(app);
export const storage= getStorage(app);