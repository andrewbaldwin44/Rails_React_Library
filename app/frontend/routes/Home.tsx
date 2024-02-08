import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  return (
    <Wrapper>
      <h1>Welcome!</h1>
      <Link to="login">Login</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: rgba(0, 0, 0, 0.5);
  height: 400px;
  width: 400px;
  line-height: 2;
  font-size: 1.6em;
  font-weight: bold;

  h1 {
    text-decoration: underline;
    font-size: 1.6em;
    margin-bottom: 20px;
  }
`;
