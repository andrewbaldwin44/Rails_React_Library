import React from 'react';
import Routes from '../routes/Index';
import styled from 'styled-components';

import GlobalStyles from "./GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <Body>
        {Routes}
      </Body>
    </>
  )
}

const Body = styled.div`
  position: absolute;
  top: 0;
`;

export default App;
