import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxSaga from 'redux-saga';
import * as reducer from './reducer';
import * as sagas from './sagas';

const persistConfig = {
  storage,
  key: 'root',
};

const reducers = combineReducers({
  auth: reducer.auth,
  loginPage: reducer.loginPage,
  payments: reducer.payments,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = reduxSaga();

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

const persistor = persistStore(store);

sagaMiddleware.run(sagas.loginSaga);
sagaMiddleware.run(sagas.logoutSaga);
sagaMiddleware.run(sagas.getPaymentsSaga);
sagaMiddleware.run(sagas.addPaymentSaga);
sagaMiddleware.run(sagas.updatePaymentSaga);
sagaMiddleware.run(sagas.approvePaymentSaga);

export { store, persistor };
