// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL89sJisvU3HhXwcy9CSRaNc_U-4Rouys",
  authDomain: "fyp-unievent.firebaseapp.com",
  databaseURL: "https://fyp-unievent-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fyp-unievent",
  storageBucket: "fyp-unievent.appspot.com",
  messagingSenderId: "380055339576",
  appId: "1:380055339576:web:70c375c422a53520acdccd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)
const messaging = getMessaging();
getToken(messaging, {vapidKey: "BHK_CVTsqZVzHaikbh99JiCP6tPETEIXJw-XS3whKBB8fYSDLE4vVpW_yjakJoDAT_j6QG6wT2wLCm1gmAmNhdA"});
export { db, auth ,storage, messaging  };
