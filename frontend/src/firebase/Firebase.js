import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCst6rZImInGhY0m8mDF9IgsvJuP7fCXgw",
  authDomain: "bookstore-1f7d7.firebaseapp.com",
  projectId: "bookstore-1f7d7",
  storageBucket: "bookstore-1f7d7.appspot.com",
  messagingSenderId: "524934252297",
  appId: "1:524934252297:web:b8c241108c55066bfdf5d8",
  measurementId: "G-KGPRJCJ1DB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);