import React from "react";
import {shallow} from "enzyme";
import {CarCard} from "../../../components/posts/CarCard";
import {getCar} from "../../utils";


describe("CarCard", () => {

  let component, car;

  beforeEach(() => {

    car = getCar();

    component = shallow(<CarCard car={car} onConfirm={jest.fn()} onCancel={jest.fn()}/>);
  });

  it("checks that CarCard contains form element", () => {
    expect(component.find("table").length).toBe(1);
  });

  it("checks that CarCard contains button element", () => {
    expect(component.find("button").length).toBe(2);
  });
});