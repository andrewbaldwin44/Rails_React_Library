import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { PASSWORD_REQUIREMENTS, AUTHENTICATION_ERROR_MESSAGES } from 'auth/constants';
import { isStrongPassword } from 'auth/utils';
import useAuth, { IAuthCallbackProps } from 'auth/useAuth';
import Footer from 'components/Login/Footer';

interface ILogin {
  isAccountCreated?: boolean;
}

export default function Login({ isAccountCreated = false }: ILogin) {
  const {
    userData,
    createUserWithEmail,
    signInWithEmail,
    signInWithGoogle,
    errorMessage,
    setErrorMessage,
  } = useAuth();

  const history = useHistory();

  useEffect(() => {
    if (userData.email) {
      history.push('/library');
    }
  }, [userData]);

  const userSignup = ({ email, password }: IAuthCallbackProps) => {
    if (isStrongPassword(password)) {
      createUserWithEmail({ email, password });
    } else if (password.length < PASSWORD_REQUIREMENTS.minimumPasswordLength) {
      setErrorMessage(AUTHENTICATION_ERROR_MESSAGES.passwordTooShort);
    } else {
      setErrorMessage(AUTHENTICATION_ERROR_MESSAGES.missingPasswordRequirements);
    }
  };

  const userLogin = ({ email, password }: IAuthCallbackProps) => {
    signInWithEmail({ email, password });
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const inputData: { [key: string]: any } = {};

    // @ts-ignore
    for (const [name, value] of formData) {
      if (value) {
        inputData[name] = value;
      }
    }

    if (isAccountCreated) {
      userLogin(inputData as IAuthCallbackProps);
    } else {
      userSignup(inputData as IAuthCallbackProps);
    }
  };

  return (
    <Wrapper>
      <Container>
        <PageLabel>{isAccountCreated ? 'Log In' : 'Sign Up'}</PageLabel>
        <StyledForm onSubmit={submitForm}>
          <TextField type='email' label='Email' name='email' variant='outlined' required />
          <TextField type='password' label='Password' name='password' variant='outlined' required />
          <SubmitButton type='submit'>{isAccountCreated ? 'Log In' : 'Sign Up'}</SubmitButton>
          {errorMessage && (
            <ErrorMessage>
              <span>{errorMessage}</span>
            </ErrorMessage>
          )}
        </StyledForm>
        <Footer isAccountCreated={isAccountCreated} signInWithGoogle={signInWithGoogle} />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;
  width: var(--authentication-form-width);
`;

const PageLabel = styled.h2`
  font-size: 2em;
  font-weight: bold;
  align-self: flex-start;
  padding: 15px 10px;
  text-shadow: 1px 1px 5px black;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border: 2px solid black;
  border-radius: 6px;
  padding: 0 16px;
  height: 40%;
  width: 100%;
  background-color: white;
  box-shadow: 1px 1px 5px #4b515d;
`;

const SubmitButton = styled.button`
  height: 50px;
  width: 100%;
  color: black;
  border: 2px solid white;
  border-radius: 6px;
  transition: all 0.4s ease-in;

  &:hover {
    border-color: var(--light-blue);
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #ffe3e3;
  color: #f13240;
  padding: 20px 10px;
`;
