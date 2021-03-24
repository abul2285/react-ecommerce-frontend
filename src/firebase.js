import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCU4fPd-FEm-ViAKKfxXOmj6Q18s6EcQbs',
  authDomain: 'ecommerce-631e9.firebaseapp.com',
  projectId: 'ecommerce-631e9',
  storageBucket: 'ecommerce-631e9.appspot.com',
  messagingSenderId: '691082167353',
  appId: '1:691082167353:web:539c46a45274f32777f9e8',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
