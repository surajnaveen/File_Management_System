// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRD6RCiqT46VF2HO0c7kvOuP1uLlCnZ6c",
  authDomain: "unifile-83068.firebaseapp.com",
  projectId: "unifile-83068",
  storageBucket: "unifile-83068.appspot.com",
  messagingSenderId: "598820332257",
  appId: "1:598820332257:web:706fc4c75e0a7b9306cda0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const Firestore = getFirestore(app);
const storage = getStorage(app);

export {auth,Firestore,storage,createUserWithEmailAndPassword,updateProfile};