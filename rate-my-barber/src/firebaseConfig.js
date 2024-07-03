import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAIfLajGePDXkqoxBWmMCzIvGUiN11SXq4",
    authDomain: "ratemybarber-58af7.firebaseapp.com",
    projectId: "ratemybarber-58af7",
    storageBucket: "ratemybarber-58af7.appspot.com",
    messagingSenderId: "85691260516",
    appId: "1:85691260516:web:3dca6af12ac80a62460971",
    measurementId: "G-QS7V2K817B"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };

