import { configureStore as defaultConfigureStore } from '@reduxjs/toolkit';

import rootReducer from 'redux/slice/root.slice';
import type { IRootState } from 'redux/slice/root.slice';
import createReduxMiddleware from 'redux/middleware/persistState';

const configureStore = (
  preloadedState: IRootState | null,
  updateState: (state: IRootState) => void,
) =>
  defaultConfigureStore({
    reducer: rootReducer,
    preloadedState: preloadedState || {},
    middleware: createReduxMiddleware<IRootState>(updateState),
  });

export type { IRootState, Action } from 'redux/slice/root.slice';
export default configureStore;
