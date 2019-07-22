import React from "react";
import {render} from "enzyme";
import {store} from "../../../loader";
import {NewPostBody} from "../../../components/posts/NewPostBody";
import {getCar} from "../../utils";


describe("NewPostBody", () => {

  let component, car;

  beforeEach(() => {

    car = getCar();

    const state = store.getState();

    component = render(
      <NewPostBody
        post={state.post}
        states={[{_id:"1", name: "City1"}, {_id: "2", name: "City2"}]}
        city={state.city}
        cities={state.cities}
        transmissions={[{_id:"1", name: "auto"}, {_id: "2", name: "manual"}]}
        make={state.make}
        model={state.model}
        models={[{_id: "1", name: "model"}]}
        car={car}
        config={state.config}
        onResetCities={jest.fn()}
        onSetMake={jest.fn()}
        onSetModel={jest.fn()}
        onGetStates={jest.fn()}
        onSetState={jest.fn()}
        onGetCities={jest.fn()}
        onSetCity={jest.fn()}
        onGetCar={jest.fn()}
        onSetCar={jest.fn()}
        onCreatePost={jest.fn()}
        history={{replace: jest.fn()}}
      />);

    // console.log(component)
  });

  it("checks that NewPostBody contains textarea element", () => {
    expect(component.find("textarea").length).toBe(1);
  });

  it("checks that NewPostBody contains select elements", () => {
    expect(component.find("select").length).toBe(2);
  });

  it("checks that NewPostBody contains input elements", () => {
    expect(component.find("input").length).toBe(2);
  });

  it("checks that NewPostBody contains button elements", () => {
    expect(component.find("button").length).toBe(2);
  });
});