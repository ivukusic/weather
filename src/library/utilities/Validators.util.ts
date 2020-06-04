import moment from 'moment';
import { regex } from '../common/constants/Identifier.constants';

export class Validators {
  static email(value: string, message: string) {
    const strLength = value ? value.length : 0;
    if (strLength > 0) {
      const result = regex.email.test(value);
      if (!result) {
        return { error: true, message };
      }
    } else {
      return { error: true, message };
    }
    return false;
  }

  static required(value: any, message: string) {
    if (!value || !value.toString().trim().length) {
      return { error: true, message };
    }
    return false;
  }

  static number(value: string | number, message: string) {
    const strLength = value ? value.toString().length : 0;
    if (strLength > 0) {
      const result = regex.number.test(value.toString());
      if (!result) {
        return { error: true, message };
      }
    } else {
      return false;
    }
    return false;
  }

  static isBefore(firstValue: string | moment.Moment, secondValue: string | moment.Moment, message: string) {
    if (
      !firstValue ||
      !secondValue ||
      !moment(firstValue).isValid() ||
      !moment(secondValue).isValid() ||
      moment(secondValue).isBefore(moment(firstValue))
    ) {
      return { error: true, message };
    }
    return false;
  }
}
