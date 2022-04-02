import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyD65yUW8zfGE73670UlrJW6mraccjqTu2Y",
  authDomain: "soba-73e05.firebaseapp.com",
  projectId: "soba-73e05",
  storageBucket: "soba-73e05.appspot.com",
  messagingSenderId: "663856040839",
  appId: "1:663856040839:web:66fe9ddb97763636516122",
  measurementId: "G-Q0D58QDYGV",
};

const app = initializeApp(config);
export const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};
