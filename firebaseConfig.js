// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase konfiguration (fra Firebase console)
const firebaseConfig = {
  apiKey: "DIN_API_KEY",
  authDomain: "web-app.firebaseapp.com",
  databaseURL: "https://web-app-c295f-default-rtdb.firebaseio.com/",
  projectId: "web-app-c295f",
  storageBucket: "web-app.appspot.com",
  messagingSenderId: "724810124858",
  appId: "DIN_APP_ID",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Hent en instans af Realtime Database
const database = getDatabase(app);

export { database };
