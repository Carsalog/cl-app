import React from "react";
import {shallow} from "enzyme";
import {Link} from 'react-router-dom';
import {Social} from '../../../components/footer/Social';
import {store} from "../../../loader";


describe("Social", () => {

  let component;

  beforeAll(() => {
    component = shallow(<Social config={store.getState().config}/>);
  });

  it("checks that Social component contains social links", () => {
    expect(component.find(Link).length)
      .toBe(store.getState().config.social.length);
  });
});