import * as React from 'react';
import { mount, shallow } from '../common/test';
import Input, { IInput } from './Input';

describe('<Input />', () => {
  const mockProps = {
    onChange: jest.fn(),
    value: 'dummy value',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const wrapper = shallow(<Input {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('onChange() should trigger', () => {
    // Arrange

    const mockEvent = {
      currentTarget: { value: 'dummy new value' },
    } as React.ChangeEvent<HTMLInputElement>;

    const wrapper = mount(<Input {...mockProps} />);

    const inputProps: React.HTMLAttributes<HTMLInputElement> = wrapper
      .find('input')
      .props();

    // Act

    inputProps.onChange(mockEvent);

    // Assert

    expect(mockProps.onChange).toHaveBeenCalledWith(
      mockEvent.currentTarget.value,
      mockProps.value,
    );
  });
});
