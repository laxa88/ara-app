import * as React from 'react';
import { shallow } from '../common/test';
import InputForm from './InputForm';

describe('<InputForm />', () => {
  it('should render', () => {
    const mockProps = {
      label: 'dummy label',
      onChange: jest.fn(),
      value: 'dummy value',
    };

    const wrapper = shallow(<InputForm {...mockProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
