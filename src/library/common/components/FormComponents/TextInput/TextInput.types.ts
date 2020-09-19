import { SyntheticEvent } from 'react';

export interface ITextInputProps {
  className?: string;
  disabled?: boolean;
  error?: { error: boolean; message: string } | null;
  inputClassName?: string;
  key?: string;
  label?: string;
  onBlur?: (event: SyntheticEvent) => void;
  onChange: (event: SyntheticEvent) => void;
  onFocus?: (event: SyntheticEvent) => void;
  placeholder?: string;
  secondary?: boolean;
  showError?: boolean;
  testID?: string;
  type?: string;
  value: string;
}
