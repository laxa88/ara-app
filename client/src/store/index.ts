import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxSaga from 'redux-saga';
import { reducer as auth } from './Auth/reducer';
import { loginSaga, logoutSaga } from './Auth/sagas';
import { reducer as loginPage } from './LoginPage/reducer';

const persistConfig = {
  storage,
  key: 'root',
};

const reducers = combineReducers({
  auth,
  loginPage,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = reduxSaga();

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

const persistor = persistStore(store);

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(logoutSaga);

export { store, persistor };
