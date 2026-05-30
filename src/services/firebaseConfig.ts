import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_STEMM_LAB_API_KEY",
  authDomain: "stemm-lab-17706.firebaseapp.com",
  projectId: "stemm-lab-17706",
  storageBucket: "stemm-lab-17706.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);