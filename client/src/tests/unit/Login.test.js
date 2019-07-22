import React from "react";
import {render} from "enzyme";
import Root from "../../Root";
import {Login} from '../../components/Login';


describe("Login", () => {

  let component;

  beforeAll(() => {
    component = render(Root(Login));
  });


  it("checks that Login contains form element", () => {
    expect(component.find('form').length).toBe(1);
  });

  it("checks that Login contains input element", () => {
    expect(component.find("input").length).toBe(2);
  });

  it("checks that Login contains button element", () => {
    expect(component.find("button").length).toBe(1);
  });

});