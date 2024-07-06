import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCt-yiPsejQTCrfqy3j-NsX-PbgGNKaMBg",
  authDomain: "expense-tracker-39210.firebaseapp.com",
  projectId: "expense-tracker-39210",
  storageBucket: "expense-tracker-39210.appspot.com",
  messagingSenderId: "878631438735",
  appId: "1:878631438735:web:a2a9770a82b8cd05e9e3fa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)