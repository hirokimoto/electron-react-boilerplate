import { createStore, applyMiddleware, compose } from 'redux';
import {
  connectRouter,
  routerMiddleware,
  routerActions
} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import * as appActions from '../actions/app';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState, rootReducer, history) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Saga Middleware
  middleware.push(sagaMiddleware);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...routerActions,
    ...appActions
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    enhancer
  );

  store.runSaga = sagaMiddleware.run(rootSaga);
  store.injectedReducers = {};
  store.injectedSagas = {};

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => {
        store.replaceReducer(connectRouter(history)(rootReducer));
      }
    );

    const newYieldedSagas = require('../sagas').default;
    store.runSaga.cancel();
    store.runSaga.done.then(() => {
      store.runSaga = sagaMiddleware.run(newYieldedSagas);
    });
  }

  return store;
};

export default { configureStore };
