const createReduxMiddleware = (updateState, preloadedState) => getDefaultMiddleware => {
  const onUpdateStateMiddleware = store => next => action => {
    const nextAction = next(action);

    updateState(store.getState());

    return nextAction;
  };

  const middleware = getDefaultMiddleware({ thunk: false }).concat(onUpdateStateMiddleware);

  return middleware;
};

export default createReduxMiddleware;
