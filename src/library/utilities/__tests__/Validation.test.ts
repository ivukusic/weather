import { validateForm } from '../Validation.util';
import { Validators } from '../Validators.util';

const requiredErrorObject = (message: string) => ({
  message,
  error: true,
});
const form = {
  password: {
    error: null,
    value: 'pasword21',
    validators: [{ check: Validators.required, message: 'requiredErrorMessage' }],
    touched: false,
    isValid: false,
  },
  firstName: {
    error: null,
    value: 'name',
    validators: [{ check: Validators.required, message: 'requiredErrorMessage' }],
    touched: false,
    isValid: false,
  },
  lastName: {
    error: null,
    value: 'Vukusic',
    validators: [{ check: Validators.required, message: 'requiredErrorMessage' }],
    touched: false,
    isValid: false,
  },
  email: {
    error: null,
    value: 'name@gmail.com',
    isValid: true,
    validators: [
      { check: Validators.required, message: 'requiredErrorMessage' },
      { check: Validators.email, message: 'invalidEmailError' },
    ],
  },
};

const invalidForm = {
  ...form,
  email: { ...form.email, value: null },
  password: { ...form.password, value: '' },
  firstName: { ...form.firstName, value: '' },
  lastName: { ...form.lastName, value: '' },
};

describe('Utilities - Validation', () => {
  it('should validate form - expect to be valid', () => {
    const fields = ['firstName', 'lastName', 'email', 'password'];
    const data = validateForm(fields, form);
    expect(data).toEqual({
      isValid: true,
      newState: {
        firstName: { ...form.firstName, touched: true, isValid: true },
        lastName: { ...form.lastName, touched: true, isValid: true },
        email: { ...form.email, touched: true, isValid: true },
        password: { ...form.password, touched: true, isValid: true },
      },
    });
  });

  it('should validate form - expect to be invalid', () => {
    const fields = ['firstName', 'lastName', 'email', 'password'];
    const data = validateForm(fields, invalidForm);
    expect(data).toEqual({
      isValid: false,
      newState: {
        firstName: {
          ...invalidForm.firstName,
          error: requiredErrorObject('requiredErrorMessage'),
          touched: true,
          isValid: false,
        },
        lastName: {
          ...invalidForm.lastName,
          error: requiredErrorObject('requiredErrorMessage'),
          touched: true,
          isValid: false,
        },
        email: {
          ...invalidForm.email,
          error: requiredErrorObject('requiredErrorMessage'),
          touched: true,
          isValid: false,
        },
        password: {
          ...invalidForm.password,
          error: requiredErrorObject('requiredErrorMessage'),
          touched: true,
          isValid: false,
        },
      },
    });
  });

  it('should try to validate but empty fields', () => {
    const fields: any = [];
    const data = validateForm(fields, form);
    expect(data).toEqual({
      isValid: true,
      newState: {},
    });
  });

  it('should try to validate - empty values', () => {
    const fields = ['password'];
    const data = validateForm(fields, {});
    expect(data).toEqual({
      isValid: true,
      newState: {},
    });
  });
});
