import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import { reducer as auth } from './Auth/reducer';
import { loginSaga, logoutSaga } from './Auth/sagas';
import { reducer as loginPage } from './LoginPage/reducer';

const reducers = combineReducers({
  auth,
  loginPage,
});

const sagaMiddleware = reduxSaga();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(loginSaga);
sagaMiddleware.run(logoutSaga);

export { store };
