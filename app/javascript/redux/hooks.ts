import { useCallback } from 'react';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';
import { Dispatch, ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { IRootState } from 'redux/store';

export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
export const useDispatch: () => Dispatch = useReduxDispatch;

export function useAction(action: ActionCreatorWithPayload<IRootState>) {
  const dispatch = useDispatch();

  return useCallback(
    payload => {
      dispatch(action(payload));
    },
    [action, dispatch],
  );
}
