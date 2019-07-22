import React from "react";
import {Route, Switch} from "react-router-dom";
import {shallow} from "enzyme";
import Router from '../../Router';


describe("Router", () => {

  let component;

  beforeAll(() => {
    component = shallow(<Router />);
  });

  it("checks that Router contains Switch", () => {
    expect(component.find(Switch).length).toBe(1);
  });

  it("checks that Router contains Routes", () => {
    expect(component.find(Route).length > 0).toBeTruthy();
  });
});