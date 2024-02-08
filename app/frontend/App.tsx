import { useMemo } from "react";
import { Provider } from "react-redux";

import usePersistentState from "~/hooks/usePersistentState";
import configureStore from "~/redux/store";
import AppRoutes from "~/routes/Routes";

function App() {
  const { preloadedState, updateState } = usePersistentState();

  const store = useMemo(() => configureStore(preloadedState, updateState), []);

  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
