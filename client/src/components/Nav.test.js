import React from "react";
import {shallow} from "enzyme";
import {Nav} from './Nav';


describe("Nav", () => {

  const nav = shallow(<Nav />);

  it('should render properly', function () {
    expect(nav).toMatchSnapshot();
  });

  it("checks that Nav contains logo", () => {
    expect(nav.find('#logo').length).toBe(1);
  });

  it("checks that Nav contains UserNav component", () => {
    expect(nav.find('Connect(UserNav)')
      .exists()).toBe(true);
  });

  it('should set opposite value', function () {
    expect(nav.instance().state.navBar).toBe(true);
    nav.instance().handleNavBar();
    expect(nav.instance().state.navBar).toBe(false);
  });
});