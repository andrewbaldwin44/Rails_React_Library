import { combineReducers } from '@reduxjs/toolkit';

import user, { IUserState, UserAction } from 'redux/slice/user.slice';
import shelf, { IShelfState, ShelfAction } from 'modules/Shelf/shelf.slice';

export interface IRootState {
  shelf: IShelfState;
  user: IUserState;
}
export type Action = UserAction | ShelfAction;

const rootReducer = combineReducers({ shelf, user });

export default rootReducer;
