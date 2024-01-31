import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyChxCcZlepnNaWnsmARkWSCaMYg7hFJgOo",
  authDomain: "ecommerce-project-d04f8.firebaseapp.com",
  databaseURL: "https://ecommerce-project-d04f8-default-rtdb.firebaseio.com",
  projectId: "ecommerce-project-d04f8",
  storageBucket: "ecommerce-project-d04f8.appspot.com",
  messagingSenderId: "121520896921",
  appId: "1:121520896921:web:220bd933e1a59d3aaaf108",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
