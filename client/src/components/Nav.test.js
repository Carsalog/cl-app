import React from "react";
import {shallow} from "enzyme";
import Nav from './Nav';
import {UserNav} from './common/UserNav';


describe("Nav", () => {

  let component;

  beforeAll(() => {
    component = shallow(<Nav />);
    console.log(component.children().find(UserNav).length);
  });

  it("checks that Nav contains logo", () => {
    console.log(component);
    expect(component.find('#logo').length).toBe(1);
  });

  it("checks that Nav contains UserNav component", () => {
    expect(component.find(UserNav).length).toBe(1);
  });
});