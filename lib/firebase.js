import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApPmmYL8bGleBjeQdNsGl4W1EkFyqpStc",
  authDomain: "fuo-library-42671.firebaseapp.com",
  projectId: "fuo-library-42671",
  storageBucket: "fuo-library-42671.appspot.com",
  messagingSenderId: "540507110940",
  appId: "1:540507110940:web:ac1f7512a359a826cb69d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)