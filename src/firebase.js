import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import store from "@/store";
const config = {
  apiKey: "AIzaSyBbTB0WsTjzBMhh-w8PZKW51Esg7o20N7k",
  authDomain: "travelcalculator-3aa63.firebaseapp.com",
  databaseURL: "https://travelcalculator-3aa63.firebaseio.com",
  projectId: "travelcalculator-3aa63",
  storageBucket: "travelcalculator-3aa63.appspot.com",
  messagingSenderId: "414708090571",
  appId: "1:414708090571:web:6160b88da606b5878a3d4e",
};

const fb = firebase.initializeApp(config);
const db = firebase.firestore();
const user = (firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
      store.dispatch("fetchUser", user);
    }, reject);
  });
});

export { fb, db, user };
