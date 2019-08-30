import React from 'react';
import {shallow} from 'enzyme';
import {Icon} from './Icon';

describe('Icon', () => {
  
  const props = {
    view: 'test view',
    icon: 'test icon'
  };
  const icon = shallow(<Icon {...props} />);

  it('should render properly', function () {
    expect(icon).toMatchSnapshot();
  });

  it('should contains view', function () {
    expect(icon.find('svg').props()).toHaveProperty('viewBox', props.view);
  });

  it('should contains icon', function () {
    expect(icon.find('path').props()).toHaveProperty('d', props.icon);
  });
});