import firebase from 'firebase';

const firebaseConfig =  {
  apiKey: "AIzaSyD4NZ1oc83NF5HswWXsWcJf3yN1Fcsx-Bg",
  authDomain: "entuber.firebaseapp.com",
  databaseURL: "https://entuber.firebaseio.com",
  projectId: "entuber",
  storageBucket: "entuber.appspot.com",
  messagingSenderId: "431966848925",
  appId: "1:431966848925:web:db6b793ad21b88da409174",
  measurementId: "G-CXP8MYBDVF"
};

const Firebase = firebase.initializeApp(firebaseConfig);    

export default Firebase;