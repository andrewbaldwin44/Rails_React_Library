import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { Provider } from "react-redux";

import usePersistentState from "~/hooks/usePersistentState";
import configureStore from "~/redux/store";
import AppRoutes from "~/routes/Routes";
import theme from "~/styles/theme";

function App() {
  const { preloadedState, updateState } = usePersistentState();

  const store = useMemo(() => configureStore(preloadedState, updateState), []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
