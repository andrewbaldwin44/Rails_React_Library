import { Link } from "react-router-dom";
import styled from "styled-components";

interface IFooter {
  isAccountCreated: boolean;
  signInWithGoogle: () => void;
}

export default function Footer({
  isAccountCreated,
  signInWithGoogle,
}: IFooter) {
  return (
    <Wrapper>
      <Seperator>
        <span>OR</span>
      </Seperator>

      {/* <GoogleButton className="auth-button" onClick={signInWithGoogle}>
        <img src={GoogleIcon} alt="Google" />
        <span>Continue with Google</span>
      </GoogleButton> */}
      {isAccountCreated ? (
        <div className="auth-button">
          <span>{"New here? "}</span>
          <StyledLink to="/sign-up">Create an Account</StyledLink>
        </div>
      ) : (
        <div className="auth-button">
          <span>Already Have an Account?</span>
          <StyledLink to="/login">Log In</StyledLink>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .auth-button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    border: 1px solid black;
    border-radius: 6px;
    background-color: white;
    box-shadow: 1px 1px 5px #4b515d;
    height: 65px;
    width: var(--authentication-form-width);
  }
`;

const Seperator = styled.p`
  margin: 45px 0;
  line-height: 0.5;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);

  span {
    display: inline-block;
    position: relative;

    &:before,
    &:after {
      content: "";
      position: absolute;
      border-bottom: 1px solid rgba(255, 255, 255, 0.7);
      width: calc(var(--authentication-form-width) / 2 - 30px);
      top: 50%;
    }

    &:before {
      right: 100%;
      margin-right: 15px;
    }

    &:after {
      left: 100%;
      margin-left: 15px;
    }
  }
`;

const GoogleButton = styled.button`
  justify-content: space-around;

  margin-bottom: 35px;
  font-family: "Inter", sans-serif;

  img {
    height: 38px;
    width: 38px;
    margin-right: 35px;
  }

  span {
    width: 240px;
  }
`;

const StyledLink = styled(Link)`
  color: #0366d6;
  text-decoration: underline;
  padding-left: 10px;
`;
