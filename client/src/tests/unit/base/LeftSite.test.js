import React from "react";
import Root from "../../../Root";
import {render} from "enzyme";
import LeftSide from "../../../components/base/LeftSite";


describe("LeftSide", () => {

  let component;

  beforeEach(() => {
    component = render(Root(LeftSide));
  });


  it("make sure that LeftSite contains form element", () => {
    expect(component[0].name).toEqual("form");
  });

  it("make sure that LeftSite contains input element", () => {
    expect(component.find("input").length).toBe(1);
  });

  it("make sure that LeftSite contains button element", () => {
    expect(component.find("button").length).toBe(1);
  });

});