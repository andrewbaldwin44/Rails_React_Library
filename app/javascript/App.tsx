import { useMemo } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';

import usePersistentState from 'hooks/usePersistentState';
import configureStore from 'redux/store';
import Routes from 'routes/Index';
import GlobalStyles from 'components/GlobalStyles';

function App() {
  const { preloadedState, updateState } = usePersistentState();

  const store = useMemo(() => configureStore(preloadedState, updateState), []);

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Body>{Routes}</Body>
    </Provider>
  );
}

const Body = styled.div`
  position: absolute;
  top: 0;
`;

export default App;
