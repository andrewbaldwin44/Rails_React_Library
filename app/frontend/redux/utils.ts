import type { Action } from "~/redux/store";
import { merge } from "~/utils/object";

export function updateStateWithPayload<ReducerState>(
  state: ReducerState,
  { payload }: Action
) {
  return merge(state, payload);
}
