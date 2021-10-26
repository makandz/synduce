import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCg4OM7y3A-dUVi7xfgv3XEE--gOh-eC5I",
  authDomain: "synduce-auth.firebaseapp.com",
  projectId: "synduce-auth",
  storageBucket: "synduce-auth.appspot.com",
  messagingSenderId: "241781188448",
  appId: "1:241781188448:web:6d8bee76a21aab646f2005",
  measurementId: "G-TC14L2CDBT",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
