import React from "react";
import {shallow} from "enzyme";
import {store} from "../../../loader";
import {Vin} from "../../../components/posts/Vin";
import CarCard from "../../../components/posts/CarCard";
import {getCar} from "../../utils";


describe("Vin", () => {

  let component, car;

  beforeEach(() => {

    car = getCar();

    const state = store.getState();

    component = CAR => shallow(
      <Vin
        car={CAR}
        base={state.config.base}
        urls={state.config.urls}
        onGetCar={jest.fn()}
        onGetTransmissions={jest.fn()}
        onCancel={jest.fn()}
        onGetMake={jest.fn()}
      />);
  });

  it("checks that Vin contains CarCard component", () => {
    expect(component(car).find(CarCard).length).toBe(1);
  });

  it("checks that Vin contains form element", () => {
    expect(component(null).find("form").length).toBe(1);
  });

  it("checks that Vin contains button element", () => {
    expect(component(null).find("button").length).toBe(1);
  });
});