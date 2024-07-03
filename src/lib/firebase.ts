import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAK8tyIsp8TeYoHlP451tad3ArtHh9H55U",
  authDomain: "expense-tracker-76ba0.firebaseapp.com",
  projectId: "expense-tracker-76ba0",
  storageBucket: "expense-tracker-76ba0.appspot.com",
  messagingSenderId: "972278010028",
  appId: "1:972278010028:web:ef49e4e3f8f7993a084f09"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)