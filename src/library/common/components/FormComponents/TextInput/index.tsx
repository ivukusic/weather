import React from 'react';

import { ITextInputProps } from './TextInput.types';

import './TextInput.style.scss';

export const TextInput = ({
  className,
  disabled,
  error,
  showError,
  inputClassName,
  label,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  secondary,
  testID,
  type,
  value,
}: ITextInputProps): JSX.Element => (
  <div
    className={`d-flex flex-column text-input${secondary ? ` text-input--secondary` : ''}${
      className ? ` ${className}` : ''
    }`}
    data-testid={testID}
  >
    {label && <label>{label}</label>}
    <input
      className={`text-input_input
        ${disabled ? ` text-input_input--disabled` : ''}
        ${type === 'password' ? ' text-input_input--password' : ''}
        ${inputClassName ? ` ${inputClassName}` : ''}
      `}
      disabled={disabled}
      type={type}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      placeholder={placeholder}
      value={value}
    />
    {showError && <div className="text-input_error-message">{error && error.message}</div>}
  </div>
);

TextInput.defaultProps = {
  className: '',
  disabled: false,
  inputClassName: '',
  showError: true,
  placeholder: '',
  secondary: false,
  type: 'text',
};

export default TextInput;
