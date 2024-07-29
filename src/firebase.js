// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCafCjl2O3qwDVK5krvD05iFajR4alEJD4",
  authDomain: "wayumart-9e794.firebaseapp.com",
  projectId: "wayumart-9e794",
  storageBucket: "wayumart-9e794.appspot.com",
  messagingSenderId: "664417486539",
  appId: "1:664417486539:web:88461dfb4237ce3eb73d4e",
  measurementId: "G-51Q38TWJ6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider,firebaseConfig };
