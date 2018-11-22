// @flow
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import { createHashHistory } from 'history';
import { configureStore } from '../store/configureStore';
import immutablePersistenceTransform from '../utils/transform';

const history = createHashHistory();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router'],
  transforms: [immutablePersistenceTransform],
};

const reducers = combineReducers({
  router: connectRouter(history),
  app: require('./app').reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const initialState = {};

const store = configureStore(initialState, persistedReducer, history)

const persistor = persistStore(store);

export { store, persistor, history };
