import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAyqBQaKQZ3mvRLimRa5mdVUkKDpOKifTI",
  authDomain: "fideen-portal.firebaseapp.com",
  projectId: "fideen-portal",
  storageBucket: "fideen-portal.firebasestorage.app",
  messagingSenderId: "984676075874",
  appId: "1:984676075874:web:5f703e73f19cd8ebb4c43b",
  measurementId: "G-EHTME0T3R1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
