import * as React from 'react';
import { Provider } from 'react-redux';

import { mockStore, mount, shallow } from '../common/test';
import { IProps as IInputForm } from '../components/InputForm';
import { ActionTypes } from '../store/LoginPage/types';
import LoginPage, { LoginPage as Base } from './LoginPage';

describe('<LoginPage />', () => {
  it('should render', () => {
    const mockProps = {
      email: 'dummy email',
      login: jest.fn(),
      password: 'dummy password',
      setEmail: jest.fn(),
      setPassword: jest.fn(),
    };

    const wrapper = shallow(<Base {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should update email and password', () => {
    // Arrange

    const mockEmail1 = 'dummy email';
    const mockPassword1 = 'dummy password';

    const mockEmail2 = 'new dummy email';
    const mockPassword2 = 'new dummy password';

    const initialState = {
      email: mockEmail1,
      password: mockPassword1,
    };

    const expected = [
      { type: ActionTypes.SET_EMAIL, payload: { email: mockEmail2 } },
      { type: ActionTypes.SET_PASSWORD, payload: { password: mockPassword2 } },
    ];

    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

    const inputForms = wrapper.children().find('InputForm');
    type InputFormProps = React.HTMLAttributes<HTMLInputElement> & IInputForm;

    // Act

    (inputForms.at(0).props() as InputFormProps).onChange(mockEmail2, '');
    (inputForms.at(1).props() as InputFormProps).onChange(mockPassword2, '');

    // Assert

    expect(store.getActions()).toEqual(expected);
  });
});
