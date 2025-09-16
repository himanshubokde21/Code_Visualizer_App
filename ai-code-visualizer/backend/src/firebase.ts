// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7RZAPN-tbnkWakhY3Hm92sp5uvI7XZBw",
  authDomain: "codeneura-37ab6.firebaseapp.com",
  projectId: "codeneura-37ab6",
  storageBucket: "codeneura-37ab6.firebasestorage.app",
  messagingSenderId: "959527903811",
  appId: "1:959527903811:web:bab9c72b7ddb4774f3eaf6",
  measurementId: "G-TEDGMXQXCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);