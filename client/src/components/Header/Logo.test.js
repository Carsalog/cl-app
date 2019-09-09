import React from "react";
import {shallow} from "enzyme";
import {Logo} from './Logo';

describe('Logo', () => {

  const props = {
    icon: {},
    www: "test main url"
  };
  const logo = shallow(<Logo {...props} />);

  it('should render properly', function () {
    expect(logo).toMatchSnapshot();
  });

  it('should contains icon component', function () {
    expect(logo.find('Icon').exists()).toBe(true);
  });

  it('should contains main url', function () {
    expect(logo.find('Link').props())
      .toHaveProperty('to', props.www);
  });
});