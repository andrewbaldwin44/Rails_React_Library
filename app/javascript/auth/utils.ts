import { PASSWORD_REQUIREMENTS, AUTHENTICATION_ERROR_MESSAGES } from 'auth/constants';

export function handleFirebaseAuthError({ code }: { code: string }) {
  switch (code) {
    case 'auth/user-not-found':
      return AUTHENTICATION_ERROR_MESSAGES.userNotFound;
    case 'auth/wrong-password':
      return AUTHENTICATION_ERROR_MESSAGES.wrongPassword;
    case 'auth/email-already-in-use':
      return AUTHENTICATION_ERROR_MESSAGES.emailInUse;
    case 'auth/cancelled-popup-request':
    case 'auth/popup-closed-by-user':
      return;
    default:
      return AUTHENTICATION_ERROR_MESSAGES.defaultMessage;
  }
}

export const isStrongPassword = (password: string) =>
  PASSWORD_REQUIREMENTS.minimumPasswordRequirements.test(password);
