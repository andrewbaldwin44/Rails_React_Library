import { combineReducers } from '@reduxjs/toolkit';

import user, { IUserState, UserAction } from 'redux/slice/user.slice';

export interface IRootState {
  user: IUserState;
}
export type Action = UserAction;

const rootReducer = combineReducers({ user });

export default rootReducer;
