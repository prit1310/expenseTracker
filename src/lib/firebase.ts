import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCedBnLphHtuM_OdjhBPakRSu82LwIalFQ",
  authDomain: "expense-traker-5bde6.firebaseapp.com",
  projectId: "expense-traker-5bde6",
  storageBucket: "expense-traker-5bde6.appspot.com",
  messagingSenderId: "398071464367",
  appId: "1:398071464367:web:52985e02ef5def2e262f5a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)