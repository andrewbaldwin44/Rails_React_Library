import { merge } from 'utils/object';
import type { Action } from 'redux/store';

export function updateStateWithPayload<ReducerState>(state: ReducerState, { payload }: Action) {
  return merge(state, payload);
}
