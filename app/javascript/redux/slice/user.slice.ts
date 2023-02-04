import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateStateWithPayload } from 'redux/utils';

export interface IUserState {
  user_id: string;
  email: string;
  username: string;
  avatar: string;
}

export type UserAction = PayloadAction<IUserState | undefined>;

const initialState = {
  user_id: '',
  email: '',
  username: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: updateStateWithPayload<IUserState>,
    clearUser: () => initialState,
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
