import { configure, mount, render, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import reduxMockStore from 'redux-mock-store';

configure({ adapter: new Adapter() });

// Reserved for later on, if we use thunk or saga or anything else
const middleware: any = [];

function mockStore(state: any) {
  return reduxMockStore(middleware)(state);
}

export { shallow, mount, render, mockStore };
