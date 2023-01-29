import type { Store, Dispatch, Action, CombinedState } from '@reduxjs/toolkit';

const createReduxMiddleware =
  <IRootState>(updateState: (state: IRootState) => void) =>
  (getDefaultMiddleware: any) => {
    const onUpdateStateMiddleware =
      (store: Store<CombinedState<IRootState>>) => (next: Dispatch) => (action: Action) => {
        const nextAction = next(action);

        updateState(store.getState());

        return nextAction;
      };

    const middleware = getDefaultMiddleware({ thunk: false }).concat(onUpdateStateMiddleware);

    return middleware;
  };

export default createReduxMiddleware;
