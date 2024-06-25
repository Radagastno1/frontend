import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVlz4fHtN8iTdaYVuiafToqQ0W-62ojMA",
  authDomain: "todo-bb764.firebaseapp.com",
  projectId: "todo-bb764",
  storageBucket: "todo-bb764.appspot.com",
  messagingSenderId: "252209574283",
  appId: "1:252209574283:web:9dfe6e4c3c69ca6d2fbf8e",
  measurementId: "G-KREBCBNDN2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
