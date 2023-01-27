import { createContext, useState, useEffect } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import DefaultProfile from '../assets/images/default_avatar.jpg';
import { postDatabase } from '../utils/request';

export const AuthenticationContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
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

  const resetUserData = () => setUserData(null);

  const handleSignOut = () => {
    signOut();
    resetUserData();
  };

  const parseUser = ({ email, displayName, photoURL, uid: userID }) => {
    return {
      email,
      username: displayName || email,
      avatar: photoURL || DefaultProfile,
      userID,
    };
  };

  useEffect(() => {
    if (user) {
      const newUserData = parseUser(user);

      postDatabase('/users/create', newUserData);
      setUserData(newUserData);
    } else if (user === null) {
      setUserData({});
    }
  }, [user]);

  return (
    <AuthenticationContext.Provider
      value={{
        userData,
        resetUserData,
        createUserWithEmail,
        signInWithEmail,
        signInWithGoogle,
        handleSignOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(AuthenticationProvider);
