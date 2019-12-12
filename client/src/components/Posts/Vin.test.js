import React from "react";
import {shallow} from "enzyme";
import {Vin} from "./Vin";
import {getCar} from "../../tests/utils";


describe("Vin", () => {

  let car = getCar();

  const props = {
    car: null,
    base: {},
    urls: {},
    text: {
      header: "test header",
      name: "test name",
      button: "test button"
    }
  };

  const vin = shallow(<Vin {...props}/>);

  it('should render properly', function () {
    expect(vin).toMatchSnapshot();
  });


  it("checks that Vin contains form element", () => {
    expect(vin.find("form").exists()).toBe(true);
  });

  it("checks that Vin contains button element", () => {
    expect(vin.find("button").exists()).toBe(true);
  });

  describe('if car exists', () => {

    props.car = car;

    const wrapper = shallow(<Vin {...props}/>);

    it("display CarCard component", () => {
      expect(wrapper.find('CarCard').exists()).toBe(true);
    });
  });
});