import React, { SyntheticEvent } from 'react';
import './Button.style.scss';

export const Button = ({ className, label, onClick, testID, type }: ButtonProps): JSX.Element => (
  <button
    className={`button ${type && `button--${type}`} ${!!className && className}`}
    data-test={testID}
    onClick={onClick}
  >
    {label}
  </button>
);

Button.defaultProps = {
  className: '',
  type: 'primary',
};

interface ButtonProps {
  className?: string;
  label: string;
  onClick?: (event: SyntheticEvent) => void;
  testID?: string;
  type?: 'primary' | 'secondary';
}

export default Button;
