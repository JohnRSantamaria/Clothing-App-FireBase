import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import{
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU4swrlOvvGiEKEXfVsQ1Zqmk_AmACegg",
  authDomain: "crwn-clothing-db-a6218.firebaseapp.com",
  projectId: "crwn-clothing-db-a6218",
  storageBucket: "crwn-clothing-db-a6218.appspot.com",
  messagingSenderId: "35040800402",
  appId: "1:35040800402:web:43ea0d9fc1a09b5209804b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();


//Force them to select and account  
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider);


//allow us to request data or information from firestrom
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef); //we will be able to know if the ref exists or not in our db console.log(userSnapshot.exists());

  console.log(userSnapshot.exists());
  
  if(!userSnapshot.exists()){
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }

  }

  return userDocRef;
/*
  if user data does not exists  
  // create / set the document with the data from userAuth in my collection

  if user data exists
  //return userDocRef

*/

}
