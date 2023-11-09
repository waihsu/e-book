import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANb1mQyfFu2wjIeOKmkle77QFG45RW44g",
  authDomain: "waihsu-7ed10.firebaseapp.com",
  projectId: "waihsu-7ed10",
  storageBucket: "waihsu-7ed10.appspot.com",
  messagingSenderId: "494807454684",
  appId: "1:494807454684:web:3ad31f7b2053a96add7519",
  measurementId: "G-BWJJ5BL8X2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
