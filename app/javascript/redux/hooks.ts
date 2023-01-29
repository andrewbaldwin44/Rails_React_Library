import { useCallback } from 'react';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import {
  ActionCreatorWithoutPayload,
  ActionCreator,
  ActionCreatorWithPayload,
  Dispatch,
} from '@reduxjs/toolkit';

import type { IRootState, Action } from 'redux/store';

export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
export const useDispatch: () => Dispatch = useReduxDispatch;

export function useAction(action: ActionCreator<Action>) {
  const dispatch = useDispatch();

  return useCallback(
    (payload?: Action['payload'] | void) => {
      dispatch(action(payload));
    },
    [action, dispatch],
  );
}
