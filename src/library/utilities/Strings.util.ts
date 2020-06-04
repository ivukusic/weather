export const convertKelvinToCelsius = (kelvin: number): string => {
  if (kelvin < 0) {
    return 'below absolute zero (0 K)';
  }
  return `${(kelvin - 273.15).toFixed(1)}`;
};

export const camelCase = (str: string): string => {
  str.replace(/^\s+|\s+$|\s+(?=\s)/g, '').toLowerCase();
  const array = str.split(' ');
  let value = '';
  array.forEach((s, i) => {
    if (s[0]) {
      value += s[0].toUpperCase() + s.slice(1);
      if (i + 1 < array.length) {
        value += ' ';
      }
    }
  });
  return value;
};

export const firstToUpperCase = (str: string): string => str && str[0].toUpperCase() + str.slice(1);

export const onlyNumbers = (input: string): string => input.replace(/[^0-9]/g, '');

export const getCurrencyFormat = (value: string): string => {
  if (!value || value === '0') {
    return '0 EUR';
  }
  return `${parseFloat(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')} EUR`;
};
