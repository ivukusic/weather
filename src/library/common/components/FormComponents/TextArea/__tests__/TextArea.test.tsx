import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { TextArea } from '..';

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

const setup = (props = {}) => <TextArea {...defaultProps} {...props} />;

describe('TextArea', () => {
  it('should be able to click on city', () => {
    const screen = render(setup());
    const element = screen.getByPlaceholderText('Enter email');
    fireEvent.input(element, { target: { value: 'Text' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
