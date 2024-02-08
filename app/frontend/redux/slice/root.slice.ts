import { combineReducers } from "@reduxjs/toolkit";

import shelf, { IShelfState, ShelfAction } from "~/modules/Shelf/shelf.slice";
import { api } from "~/redux/api";
import user, { IUserState, UserAction } from "~/redux/slice/user.slice";

export interface IRootState {
  shelf: IShelfState;
  user: IUserState;
}
export type Action = UserAction | ShelfAction;

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  shelf,
  user,
});

export default rootReducer;
