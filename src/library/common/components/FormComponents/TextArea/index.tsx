import React from 'react';

import { ITextAreaProps } from './TextArea.types';

import './TextArea.style.scss';

export const TextArea = ({
  className,
  error,
  label,
  maxLength,
  onChange,
  placeholder,
  secondary,
  rows,
  testID,
  value,
}: ITextAreaProps): JSX.Element => {
  const onChangeValue = event => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div
      className={`d-flex flex-column textarea${secondary ? ` textarea--secondary` : ''}${
        className ? ` ${className}` : ''
      }`}
      data-text={testID}
    >
      {label && (
        <div className="d-flex justify-content-between">
          <label className="textarea_label">{label}</label>
          {!!maxLength && (
            <div className={`textarea_max-length${value.length > maxLength ? ' textarea_max-length--error' : ''}`}>
              {value.length}/{maxLength}
            </div>
          )}
        </div>
      )}
      <textarea
        className="textarea_textarea"
        onChange={onChangeValue}
        placeholder={placeholder}
        value={value}
        rows={rows}
      />
      <div className="error-message error-message--right">{error && error.message}</div>
    </div>
  );
};
TextArea.defaultProps = {
  className: '',
  maxLength: 0,
  placeholder: '',
  rows: 4,
  secondary: false,
  type: 'primary',
};

export default TextArea;
