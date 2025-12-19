import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-4d85e.firebaseapp.com",
  projectId: "loginonecart-4d85e",
  storageBucket: "loginonecart-4d85e.firebasestorage.app",
  messagingSenderId: "762853752877",
  appId: "1:762853752877:web:425425e90fcb5728da38a4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}