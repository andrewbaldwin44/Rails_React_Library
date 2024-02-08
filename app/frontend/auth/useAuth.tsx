import { useState } from "react";

import DefaultProfile from "~/assets/images/default_avatar.jpg";
import {
  useCreateSessionMutation,
  useCreateUserMutation,
  useDestroySessionMutation,
} from "~/redux/api";
import { useAction, useSelector } from "~/redux/hooks";
import { userActions } from "~/redux/slice/user.slice";

export interface IAuthCallbackProps {
  email: string;
  password: string;
  profilePicture?: string;
  displayName?: string;
}

interface IAuthUser {
  displayName: string;
  email: string;
  profilePicture: string;
}

const adaptUserData = ({ displayName, email, profilePicture }: IAuthUser) => ({
  email,
  displayName,
  profilePicture: profilePicture || DefaultProfile,
});

export default function useAuth() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const setUser = useAction(userActions.setUser);
  const clearUser = useAction(userActions.clearUser);

  const userData = useSelector(({ user }) => user);

  const [createUser] = useCreateUserMutation();
  const [createSession] = useCreateSessionMutation();
  const [destroySession] = useDestroySessionMutation();

  const createUserWithEmail = async (authCallbackProps: IAuthCallbackProps) => {
    try {
      const { data } = await createUser(authCallbackProps);
      setUser(adaptUserData(data));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const loginWithEmail = async (authCallbackProps: IAuthCallbackProps) => {
    try {
      const { data } = await createSession(authCallbackProps);
      setUser(adaptUserData(data));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const signOut = () => {
    clearUser();
    destroySession();
  };

  return {
    createUserWithEmail,
    loginWithEmail,
    signOut,
    errorMessage,
    userData,
  };
}
