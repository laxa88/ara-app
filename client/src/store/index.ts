import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import { loginPage } from './LoginPage/reducer';
import { saga as loginPageSaga } from './LoginPage/sagas';

const reducers = combineReducers({
  loginPage,
});

const sagaMiddleware = reduxSaga();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(loginPageSaga);

export { store };
