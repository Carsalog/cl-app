import React from "react";
import {shallow} from "enzyme";
import {Link} from 'react-router-dom';
import Footer from '../../components/footer';
import Social from '../../components/footer/social';


describe("Footer", () => {

  let component;

  beforeAll(() => {
    component = shallow(<Footer />);
  });

  it("checks that Footer contains footer element", () => {
    expect(component.find('footer').length).toBe(1);
  });

  it("checks that Footer contains links", () => {
    expect(component.find(Link).length > 0).toBeTruthy();
  });

  it("checks that Footer contains Social component", () => {
    expect(component.find(Social).length).toBe(1);
  });
});