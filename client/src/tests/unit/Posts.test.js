import React from "react";
import {shallow} from "enzyme";
import {Posts} from '../../components/Posts';
import {Switch, Route} from "react-router-dom";


describe("Posts", () => {

  let component;

  beforeEach(() => {
    component = shallow(<Posts />);
  });

  it("checks that Posts contains Switch", () => {
    expect(component.find(Switch).length).toBe(1);
  });

  it("checks that Posts contains routers", () => {
    expect(component.find(Route).length > 1).toBeTruthy();
  });

});