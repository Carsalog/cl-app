import React from "react";
import {shallow} from "enzyme";
import NotFound from '../../components/404';
import {Link} from "react-router-dom";


describe("NotFound", () => {

  let component;

  beforeAll(() => {
    component = shallow(<NotFound />);
  });


  it("checks that NotFound contains Links", () => {
    expect(component.find(Link).length).toBeTruthy();
  });

});