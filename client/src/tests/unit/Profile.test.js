import React from "react";
import {Route, Switch} from "react-router-dom";
import {shallow} from "enzyme";
import {Profile} from '../../components/profile';
import Sidebar from "../../components/profile/sidebar";

describe("Profile", () => {

  let component;

  beforeEach(() => {
    const history = {push: jest.fn(), replace: jest.fn()};

    component = shallow(<Profile history={history}
                                 onSetMessage={jest.fn()}
                                 user={{_id: "1"}} />);
  });

  it("checks that Profile contains Sidebar component", () => {
    expect(component.find(Sidebar).length).toBe(1);
  });

  it("checks that Profile contains Switch", () => {
    expect(component.find(Switch).length).toBe(1);
  });

  it("checks that Profile contains Route", () => {
    expect(component.find(Route).length).toBeTruthy();
  });

});