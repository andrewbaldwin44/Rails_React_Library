import { combineReducers } from '@reduxjs/toolkit';

import user from 'redux/slice/user.slice';

const rootReducer = combineReducers({ user });

export default rootReducer;
