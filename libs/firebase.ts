// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb83fzFsDFMj-dT4t5imi-nQykWNVtqZA",
  authDomain: "teddy-shop-989e2.firebaseapp.com",
  projectId: "teddy-shop-989e2",
  storageBucket: "teddy-shop-989e2.appspot.com",
  messagingSenderId: "1029677747919",
  appId: "1:1029677747919:web:1072e1350b8ab78c4071ba"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;