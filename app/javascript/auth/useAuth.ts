import { useEffect, useState } from 'react';

import { auth, googleProvider } from 'auth/auth-service';
import { userActions } from 'redux/slice/user.slice';
import { useAction, useSelector } from 'redux/hooks';
import useAsync from 'hooks/useAsync';
import { handleFirebaseAuthError } from 'auth/utils';
import DefaultProfile from 'assets/images/default_avatar.jpg';
import { asyncRequest, REQUEST_METHODS } from 'api/asyncRequest';

export interface IAuthCallbackProps {
  email: string;
  password: string;
}

type AuthCallback = (authCallbackProps: IAuthCallbackProps) => Promise<void>;
type AuthError = {
  code: string;
};

interface IAuthUser {
  email: string;
  photoURL: string;
  displayName: string;
  uid: string;
}

export default function useAuth() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const setUser = useAction(userActions.setUser);
  const clearUser = useAction(userActions.clearUser);

  const userData = useSelector(({ user }) => user);

  const getAuthenticatedUser = () => {
    const {
      email,
      photoURL: profilePicture,
      displayName,
      uid: user_id,
    } = (auth.currentUser as unknown as { toJSON: () => IAuthUser }).toJSON();
    return {
      user_id,
      email,
      avatar: profilePicture || DefaultProfile,
      username: displayName || email,
    };
  };

  const { execute: createUserWithEmail, error: createUserError } = useAsync<
    AuthCallback,
    void,
    AuthError
  >(async ({ email, password }) => {
    await auth.createUserWithEmailAndPassword(email, password);

    const user = getAuthenticatedUser();
    await asyncRequest('users/create', { type: REQUEST_METHODS.POST, body: user });

    setUser(user);
  });
  const { execute: signInWithEmail, error: signInError } = useAsync<AuthCallback, void, AuthError>(
    async ({ email, password }) => {
      await auth.signInWithEmailAndPassword(email, password);
      setUser(getAuthenticatedUser());
    },
  );
  const { execute: signInWithGoogle, error: googleSignInError } = useAsync(async () => {
    await auth.signInWithPopup(googleProvider);
    const user = getAuthenticatedUser();

    await asyncRequest('users/create', { type: REQUEST_METHODS.POST, body: user });

    setUser(user);
  });

  const { execute: signOut } = useAsync(async () => {
    await auth.signOut();
    clearUser();
  });

  useEffect(() => {
    if (createUserError || signInError || googleSignInError) {
      setErrorMessage(
        handleFirebaseAuthError((createUserError || signInError || googleSignInError) as AuthError),
      );
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
