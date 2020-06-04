// // jest-dom adds custom jest matchers for asserting on DOM nodes.
// // allows you to do things like:
// // expect(element).toHaveTextContent(/react/i)
// // learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/extend-expect';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// tslint:disable: no-console
const consoleError = console.error;
const consoleWarn = console.warn;
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      !args[0].includes('Warning: An update to %s inside a test was not wrapped in act') &&
      !args[0].includes('Warning: Failed prop type: Invalid prop `minDate` of type `object`') &&
      !args[0].includes('Warning: Failed prop type: Invalid prop `maxDate` of type `object`') &&
      !args[0].includes('Warning: A component is changing an uncontrolled') &&
      !args[0].includes('Warning: A component is changing a controlled input')
    ) {
      consoleError(...args);
    }
  });
  jest.spyOn(console, 'warn').mockImplementation((...args) => {
    if (
      !args[0].includes("<Fit />'s child") &&
      !args[0].includes("<Fit />'s parent") &&
      !args[0].includes(
        'Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date',
      )
    ) {
      consoleWarn(...args);
    }
  });
});
