import React from 'react';
import Routes from '../routes/Index';
import styled from 'styled-components';

import GlobalStyles from "./GlobalStyles";
import BackgroundImage from '../assets/images/background.jpeg';

function App() {
  return (
    <>
      <GlobalStyles />
      <Background />
      <Body>
        {Routes}
      </Body>
    </>
  )
}

const Background = styled.div`
  background-image: url('${BackgroundImage}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
`;

const Body = styled.div`
  position: absolute;
  top: 0;
`;

export default App;
