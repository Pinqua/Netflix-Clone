import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCTEdlbzeTxOMrxOasPH6RUxvdFHv3UYeo",
  authDomain: "netflix-clone-7a615.firebaseapp.com",
  databaseURL: "https://netflix-clone-7a615.firebaseio.com",
  projectId: "netflix-clone-7a615",
  storageBucket: "netflix-clone-7a615.appspot.com",
  messagingSenderId: "411469955713",
  appId: "1:411469955713:web:fad4eda6f52b26e4ef8380",
  measurementId: "G-DV4F29BF1E",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
