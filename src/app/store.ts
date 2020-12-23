import { configureStore, Action , getDefaultMiddleware  } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';	
import { createInjectorsEnhancer,forceReducerReload } from 'redux-injectors';

import  { createReducer,RootState } from './rootReducer'



export  default function configureAppStore(initialState = {}) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // sagaMiddleware: Makes redux-sagas work
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      forceReducerReload(store);
    });
  }

  return store;
}



export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

