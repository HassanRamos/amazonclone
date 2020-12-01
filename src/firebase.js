import firebase from "firebase";

const firebaseConfig = {
    
        apiKey: "AIzaSyBLWWKxBzWlFMtTB1IRiulWWSNy__Bn3WA",
        authDomain: "e-1fb31.firebaseapp.com",
        databaseURL: "https://e-1fb31.firebaseio.com",
        projectId: "e-1fb31",
        storageBucket: "e-1fb31.appspot.com",
        messagingSenderId: "208585120659",
        appId: "1:208585120659:web:e35387db15c7f66209e666"
  
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };