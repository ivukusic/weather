import { Validators } from '../Validators.util';

const message = 'error';
const error = { error: true, message };

describe('Utilities - Validators', () => {
  describe('Validators - email', () => {
    it('should validate email - expect to not be valid for empty email', () => {
      const valid = Validators.email('', message);
      expect(valid).toEqual(error);
    });

    it('should validate email - expect to not be valid for invalid email', () => {
      const valid = Validators.email('name@gmail', message);
      expect(valid).toEqual(error);
    });

    it('should validate email - expect to be valid', () => {
      const valid = Validators.email('name@gmail.com', message);
      expect(valid).toEqual(false);
    });
  });

  describe('Validators - required', () => {
    it('should validate required - expect to not be valid for empty', () => {
      const valid = Validators.required('', message);
      expect(valid).toEqual(error);
    });

    it('should validate required - expect to be valid', () => {
      const valid = Validators.required('name', message);
      expect(valid).toEqual(false);
    });
  });

  describe('Validators - number', () => {
    it('should validate number - expect to not be valid for empty', () => {
      const valid = Validators.number('', message);
      expect(valid).toEqual(false);
    });

    it('should validate number - expect to not be valid for invalid', () => {
      const valid = Validators.number('231312sadasd', message);
      expect(valid).toEqual(error);
    });

    it('should validate number - expect to be valid', () => {
      const valid = Validators.number('3131', message);
      expect(valid).toEqual(false);
    });
  });

  describe('Validators - isBefore', () => {
    it('should validate isBefore - expect to not be valid for empty', () => {
      const valid = Validators.isBefore('', '', message);
      expect(valid).toEqual(error);
    });

    it('should validate isBefore - expect to not be valid for invalid', () => {
      const valid = Validators.isBefore('23a423', '23a423', message);
      expect(valid).toEqual(error);
    });
    it('should validate isBefore - expect to not be valid is second date before first', () => {
      const valid = Validators.isBefore('2019-11-20', '2019-11-14', message);
      expect(valid).toEqual(error);
    });

    it('should validate isBefore - expect to ', () => {
      const valid = Validators.isBefore('2019-11-20', '2019-11-24', message);
      expect(valid).toEqual(false);
    });
  });
});
