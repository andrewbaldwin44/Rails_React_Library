import React from 'react';
import styled from 'styled-components';

import Routes from 'routes/Index';
import GlobalStyles from 'components/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Body>{Routes}</Body>
    </>
  );
}

const Body = styled.div`
  position: absolute;
  top: 0;
`;

export default App;
