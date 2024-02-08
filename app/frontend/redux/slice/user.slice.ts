import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { updateStateWithPayload } from "~/redux/utils";

export interface IUserState {
  email: string;
  displayName: string;
  profilePicture: string;
}

export type UserAction = PayloadAction<IUserState | undefined>;

const initialState = {
  email: "",
  displayName: "",
  profilePicture: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: updateStateWithPayload<IUserState>,
    clearUser: () => initialState,
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
