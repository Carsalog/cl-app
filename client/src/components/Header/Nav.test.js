import React from "react";
import {shallow} from "enzyme";
import {Nav} from './Nav';


describe("Nav", () => {

  const props = {
    history: { location: { pathname: '/'} }
  };
  const nav = shallow(<Nav {...props}/>);

  it('should render properly', function () {
    expect(nav).toMatchSnapshot();
  });

  it("checks that Nav contains logo", () => {
    expect(nav.find('Connect(Logo)').exists()).toBe(true);
  });

  it("checks that Nav contains UserNav component", () => {
    expect(nav.find('Connect(UserNav)')
      .exists()).toBe(true);
  });

  it('should contains hamburger menu', function () {
    expect(nav.find('.nav__burger').exists()).toBe(true);
  });

  it('should contains a checkbox', function () {
    expect(nav.find('.nav__checkbox').exists()).toBe(true);
  });
});