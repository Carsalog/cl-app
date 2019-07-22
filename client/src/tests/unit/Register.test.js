import React from "react";
import {render} from "enzyme";
import Root from "../../Root";
import Register from '../../components/register';


describe("Register", () => {

  let component;

  beforeAll(() => {
    component = render(Root(Register));
  });


  it("checks that Register contains form element", () => {
    expect(component.find('form').length).toBe(1);
  });

  it("checks that Register contains input elements", () => {
    expect(component.find("input").length > 3).toBeTruthy();
  });

  it("checks that Register contains button element", () => {
    expect(component.find("button").length).toBe(1);
  });

});