import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS_s_tQ5YrNBcM3Z_mepc5Ir_7h6E3n9Q",
  authDomain: "expense-tracker-32fcf.firebaseapp.com",
  projectId: "expense-tracker-32fcf",
  storageBucket: "expense-tracker-32fcf.appspot.com",
  messagingSenderId: "796290712548",
  appId: "1:796290712548:web:bcbcf2d652e3a90b7d7df1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)