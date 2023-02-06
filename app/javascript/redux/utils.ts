import { PayloadAction } from '@reduxjs/toolkit';
import { merge } from 'utils/object';

export function updateStateWithPayload<ReducerState, ReducerAction extends PayloadAction<any>>(
  state: ReducerState,
  { payload }: ReducerAction,
) {
  return merge(state, payload) as ReducerAction['payload'];
}
