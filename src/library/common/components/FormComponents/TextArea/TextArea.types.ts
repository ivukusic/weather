import { SyntheticEvent } from 'react';

export interface ITextAreaProps {
  className?: string;
  error?: { error: boolean; message: string } | null;
  key?: string;
  label?: string;
  maxLength?: number;
  onChange?: (event: SyntheticEvent) => void;
  placeholder?: string;
  rows?: number;
  secondary?: boolean;
  testID?: string;
  value: string;
}
