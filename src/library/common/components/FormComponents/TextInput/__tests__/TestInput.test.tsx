import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import TextInput from '../';

const onBlur = jest.fn();
const onChange = jest.fn();
const onFocus = jest.fn();

const defaultProps = {
  onBlur,
  onChange,
  onFocus,
  placeholder: 'Enter email',
  testID: 'text-input',
  value: '',
};

const setup = (props = {}) => <TextInput {...defaultProps} {...props} />;

describe('TextInput', () => {
  it('should be able to click on city', () => {
    const screen = render(setup());
    const element = screen.getByPlaceholderText('Enter email');
    fireEvent.change(element, { target: { value: 'Text' } });
    // expect(input.value).toBe('$23')
    // console.log(element);
    // expect(onChange).toHaveBeenCalledTimes(1);
  });
});
