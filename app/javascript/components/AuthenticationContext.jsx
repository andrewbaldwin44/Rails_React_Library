import React, { createContext, useState, useEffect } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { postDatabase } from '../utils/authentication';

export const AuthenticationContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCF82EWvjkMvE-k7aZINIOPcgmYRYSxdYE",
    authDomain: "home-library-2c085.firebaseapp.com",
    databaseURL: "https://home-library-2c085.firebaseio.com",
    projectId: "home-library-2c085",
    storageBucket: "home-library-2c085.appspot.com",
    messagingSenderId: "741122318911",
    appId: "1:741122318911:web:4449ef9183863e03990e8a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function createUserWithEmail(email, password) {
  return firebaseAppAuth.createUserWithEmailAndPassword(email, password);
}

function signInWithEmail(email, password) {
  return firebaseAppAuth.signInWithEmailAndPassword(email, password);
}

function signInWithGoogle() {
  return firebaseAppAuth.signInWithPopup(googleProvider);
}

function AuthenticationProvider({ children, signOut, user }) {
  const [userData, setUserData] = useState(null);

  const handleSignOut = () => {
    signOut();
    setUserData(null);
  }

  const parseUser = ({ email, displayName, uid: userID }) => {
    return {
      email,
      username: displayName || email,
      userID,
    }
  }

  useEffect(() => {
    let userDataObserver;

    if (user) {
      const userData = parseUser(user);

      postDatabase('/users/create', userData);
      setUserData(userData);
    }
    else if (user === null) {
      setUserData({});
    }
  }, [user]);

  return (
    <AuthenticationContext.Provider
      value={{
        userData,
        createUserWithEmail,
        signInWithEmail,
        signInWithGoogle,
        handleSignOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default withFirebaseAuth({
  firebaseAppAuth,
})(AuthenticationProvider);
