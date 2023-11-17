// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIVSFFIbk3mie3PnfLM9fFUcf9E5DwRmc",
  authDomain: "react-ts-demo-3dd21.firebaseapp.com",
  projectId: "react-ts-demo-3dd21",
  storageBucket: "react-ts-demo-3dd21.appspot.com",
  messagingSenderId: "615701608172",
  appId: "1:615701608172:web:e349974078eedca14557c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// const analytics = getAnalytics(app);