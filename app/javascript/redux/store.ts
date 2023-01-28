import { configureStore as defaultConfigureStore } from '@reduxjs/toolkit';

import rootReducer from 'redux/slice/root.slice';
import createReduxMiddleware from 'redux/middleware/persistState';

const configureStore = (preloadedState, updateState) =>
  defaultConfigureStore({
    reducer: rootReducer,
    preloadedState: preloadedState || {},
    middleware: createReduxMiddleware(updateState, preloadedState),
  });

export type IRootState = ReturnType<typeof rootReducer>;

export default configureStore;
