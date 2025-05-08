import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCdZMUhR85497oU-e1p-ho9l3jYGLo2RmA",
    authDomain: "recipeapp-30b00.firebaseapp.com",
    projectId: "recipeapp-30b00",
    storageBucket: "recipeapp-30b00.firebasestorage.app",
    messagingSenderId: "541895390337",
    appId: "1:541895390337:web:01b8a5f9f318ead204c980",
    measurementId: "G-MYX63QB2XM"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);