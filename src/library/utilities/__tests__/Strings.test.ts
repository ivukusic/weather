import { camelCase, convertKelvinToCelsius, firstToUpperCase, getCurrencyFormat, onlyNumbers } from '../Strings.util';

describe('Utilities - Strings', () => {
  describe('convertKelvinToCelsius', () => {
    it('should convert Kelvin to Celsius - when lower than 0', () => {
      expect(convertKelvinToCelsius(-1)).toBe('below absolute zero (0 K)');
    });

    it('should convert Kelvin to Celsius - when over 0', () => {
      expect(convertKelvinToCelsius(20)).toBe('-253.1');
    });
  });

  describe('camelCase', () => {
    it('should return strings with camel case', () => {
      expect(camelCase('some string')).toBe('Some String');
    });

    it('should return strings with camel case - when empty string passed', () => {
      expect(camelCase('')).toBe('');
    });
  });

  describe('camelCase', () => {
    it('should return strings with first capital letter', () => {
      expect(firstToUpperCase('some string')).toBe('Some string');
    });
  });

  describe('firstToUpperCase', () => {
    it('should return strings with first capital letter', () => {
      expect(firstToUpperCase('some string')).toBe('Some string');
    });
  });

  describe('onlyNumbers', () => {
    it('should return only numbers', () => {
      expect(onlyNumbers('3123da2')).toBe('31232');
    });
  });

  describe('getCurrencyFormat', () => {
    it('should return only currency with value', () => {
      expect(getCurrencyFormat('100')).toBe('100.00 EUR');
    });

    it('should return only currency with 0 value', () => {
      expect(getCurrencyFormat('0')).toBe('0 EUR');
    });
  });
});
