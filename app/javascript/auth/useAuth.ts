import { useEffect, useState } from 'react';

import { auth, googleProvider } from 'auth/auth-service';
import { userActions } from 'redux/slice/user.slice';
import { useAction, useSelector } from 'redux/hooks';
import useAsync from 'hooks/useAsync';
import { handleFirebaseAuthError } from 'auth/utils';
import DefaultProfile from 'assets/images/default_avatar.jpg';
import { asyncRequest, REQUEST_METHODS } from 'api/asyncRequest';

export default function useAuth() {
  const [errorMessage, setErrorMessage] = useState('');
  const setUser = useAction(userActions.setUser);
  const clearUser = useAction(userActions.clearUser);

  const userData = useSelector(({ user }) => user);

  const getAuthenticatedUser = () => {
    const { email, photoURL: profilePicture, displayName, uid: userID } = auth.currentUser.toJSON();
    return {
      userID,
      email,
      avatar: profilePicture || DefaultProfile,
      username: displayName || email,
    };
  };

  const { execute: createUserWithEmail, error: createUserError } = useAsync(
    async (email: string, password: string) => {
      await auth.createUserWithEmailAndPassword(email, password);

      const user = getAuthenticatedUser();
      console.log({ user, email, password });
      await asyncRequest('users/create', { type: REQUEST_METHODS.POST, body: user });

      setUser(user);
    },
  );
  const { execute: signInWithEmail, error: signInError } = useAsync(
    async (email: string, password: string) => {
      await auth.signInWithEmailAndPassword(email, password);
      setUser(getAuthenticatedUser());
    },
  );
  const { execute: signInWithGoogle, error: googleSignInError } = useAsync(async () => {
    await auth.signInWithPopup(googleProvider);
    setUser(getAuthenticatedUser());
  });

  const { execute: signOut } = useAsync(async () => {
    await auth.signOut();
    clearUser();
  });

  useEffect(() => {
    if (createUserError || signInError || googleSignInError) {
      setErrorMessage(handleFirebaseAuthError(createUserError || signInError || googleSignInError));
    }
  }, []);

  return {
    userData,
    createUserWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    errorMessage,
    setErrorMessage,
  };
}
