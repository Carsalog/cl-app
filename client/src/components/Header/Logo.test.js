import React from "react";
import {shallow} from "enzyme";
import {Logo, mapStateToProps} from './Logo';

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

  describe('mapStateToProps', () => {

    const state = {
      config: {
        header: {
          logo: "Test logo",
          www: "test www"
        }
      }
    };
    const result = mapStateToProps(state);

    it('should contains logo property', function () {
      expect(result)
        .toHaveProperty('logo', state.config.header.logo);
    });

    it('should contains www property', function () {
      expect(result)
        .toHaveProperty('www', state.config.header.www);
    });
  });
});