// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN-7CfwQr9-N0YNwoVlx_YN7w9siOMzOg",
  authDomain: "react-ts-demo-9de1c.firebaseapp.com",
  projectId: "react-ts-demo-9de1c",
  storageBucket: "react-ts-demo-9de1c.appspot.com",
  messagingSenderId: "935417349110",
  appId: "1:935417349110:web:51a16d20dea8a452893dd7",
  measurementId: "G-S0RD6KYXDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// const analytics = getAnalytics(app);