import { createSlice } from '@reduxjs/toolkit';
import { updateStateWithPayload } from 'redux/utils';

const initialState = {
  userID: null,
  email: null,
  username: null,
  avatar: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: updateStateWithPayload,
    clearUser: () => initialState,
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
