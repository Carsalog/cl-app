import React from "react";
import Root from "../../../Root";
import {render} from "enzyme";
import RightSide from "../../../components/base/RightSite";
import {store} from "../../../loader";
import {GET_STATES} from "../../../actions/types";


describe("RightSide", () => {
  let component;

  beforeEach(() => {
    store.dispatch({type: GET_STATES, payload: [{_id: "1", name: "State", abbreviation: "ST"}]});

    component = render(Root(RightSide));
  });

  it("make sure that RightSide contains form element", () => {
    expect(component[0].name).toEqual("form");
  });

  it("make sure that RightSide contains select element", () => {
    expect(component.find("select").length).toBe(1);
  });

  it("make sure that RightSide contains button element", () => {
    expect(component.find("button").length).toBe(1);
  });
});