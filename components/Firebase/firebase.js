import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfusEjPdRM5o904IImr4pVZdehMHANgpQ",
  authDomain: "ac2-universityapp.firebaseapp.com",
  projectId: "ac2-universityapp",
  storageBucket: "ac2-universityapp.appspot.com",
  messagingSenderId: "490936900416",
  appId: "1:490936900416:web:1d6e78003cd372d92478a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
