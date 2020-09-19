import React from 'react';
import { Toast as BootstrapToast, ToastBody, ToastHeader } from 'reactstrap';

import { firstToUpperCase } from 'library/utilities';

import './Toast.style.scss';

const Toast = ({
  isFirst,
  type,
  message,
  toggleToast,
}: {
  isFirst;
  type: 'success' | 'error';
  message: string;
  toggleToast: any;
}) => (
  <BootstrapToast className={`toast ${isFirst ? 'toast--first' : ''}`}>
    <ToastHeader className={`toast-header ${type ? `toast-header--${type}` : ''}`} toggle={toggleToast}>
      {firstToUpperCase(type)}
    </ToastHeader>
    <ToastBody className="toast-body">
      <p>{message}</p>
    </ToastBody>
  </BootstrapToast>
);

export default Toast;
