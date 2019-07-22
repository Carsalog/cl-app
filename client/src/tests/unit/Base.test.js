import React from "react";
import {shallow} from "enzyme";
import Base from "../../components/base";
import LeftSide from "../../components/base/LeftSite";
import RightSite from "../../components/base/RightSite";


describe("Test for Base component", () => {

  let component;

  beforeEach(() => {
    component = shallow(<Base/>);
  });

  it("Make sure that Base contains LeftSide component", () => {
    expect(component.find(LeftSide).length).toBe(1);
  });

  it("Make sure that Base contains RightSite component", () => {
    expect(component.find(RightSite).length).toBe(1);
  });
});