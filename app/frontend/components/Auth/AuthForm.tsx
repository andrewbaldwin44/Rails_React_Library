import { useEffect } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useAuth, { IAuthCallbackProps } from "~/auth/useAuth";
import Form from "~/components/Form/Form";
import Footer from "~/components/Login/Footer";

interface ILogin {
  isAccountCreated?: boolean;
}

export default function AuthForm({ isAccountCreated = false }: ILogin) {
  const {
    userData,
    createUserWithEmail,
    loginWithEmail,
    signInWithGoogle,
    errorMessage,
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (userData.email) {
      navigate("/library");
    }
  }, [userData]);

  const submitForm = (authCallbackProps: IAuthCallbackProps) => {
    if (isAccountCreated) {
      loginWithEmail(authCallbackProps);
    } else {
      createUserWithEmail(authCallbackProps);
    }
  };

  return (
    <Wrapper>
      <Container>
        <PageLabel>{isAccountCreated ? "Log In" : "Sign Up"}</PageLabel>
        <StyledForm onSubmit={submitForm}>
          <TextField
            type="email"
            label="Email"
            name="email"
            variant="outlined"
            required
          />
          {!isAccountCreated && (
            <TextField
              type="text"
              label="Display Name"
              name="displayName"
              variant="outlined"
              required
            />
          )}
          <TextField
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            required
          />
          <SubmitButton type="submit">
            {isAccountCreated ? "Log In" : "Sign Up"}
          </SubmitButton>
          {errorMessage && (
            <ErrorMessage>
              <span>{errorMessage}</span>
            </ErrorMessage>
          )}
        </StyledForm>
        <Footer
          isAccountCreated={isAccountCreated}
          signInWithGoogle={signInWithGoogle}
        />
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

const StyledForm = styled(Form<IAuthCallbackProps>)`
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
  border: 1px solid black;

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
