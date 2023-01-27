import { configureStore } from '@reduxjs/toolkit';

import rootReducer from 'redux/reducers.root';

const store = configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

export default store;
