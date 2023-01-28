import { merge } from 'utils/object';

export function updateStateWithPayload(state, { payload }) {
  return merge(state, payload);
}
