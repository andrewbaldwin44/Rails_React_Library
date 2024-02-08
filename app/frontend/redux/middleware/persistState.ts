import type { Store, Dispatch, Action } from "@reduxjs/toolkit";

import { api } from "~/redux/api";

const createReduxMiddleware =
  <IRootState>(updateState: (state: IRootState) => void) =>
  (getDefaultMiddleware: any) => {
    const onUpdateStateMiddleware =
      (store: Store<IRootState>) => (next: Dispatch) => (action: Action) => {
        const nextAction = next(action);

        updateState(store.getState());

        return nextAction;
      };

    const middleware = getDefaultMiddleware()
      .concat(api.middleware)
      .concat(onUpdateStateMiddleware);

    return middleware;
  };

export default createReduxMiddleware;
