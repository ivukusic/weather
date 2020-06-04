import { shallow } from 'enzyme';
import React from 'react';

import { Button } from '..';

const defaultProps = {
  className: 'class',
  label: 'Label',
  onClick: jest.fn(),
};

const setup = (props = {}) => <Button {...defaultProps} {...props} />;

describe('Button Common Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to click on button', () => {
    const wrapper = shallow(setup());
    wrapper.simulate('click');
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
