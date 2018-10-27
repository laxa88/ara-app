import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loginPage } from './LoginPage/reducers';

const reducers = combineReducers({
  loginPage,
});

const store = createStore(reducers, composeWithDevTools());

export { store };
