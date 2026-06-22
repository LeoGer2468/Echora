import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSUXYuW6OiF-muLtfX4xLuCZQ6caf05AA",
  authDomain: "echora-3ce49.firebaseapp.com",
  projectId: "echora-3ce49",
  storageBucket: "echora-3ce49.firebasestorage.app",
  messagingSenderId: "53988779152",
  appId: "1:53988779152:web:027000094290afb500e415",
  measurementId: "G-XD5FQ8Y9TZ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };