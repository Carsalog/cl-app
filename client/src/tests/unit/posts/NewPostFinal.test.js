import React from "react";
import {render} from "enzyme";
import {store} from "../../../loader";
import {NewPostFinal} from "../../../components/posts/NewPostFinal";
import {getCar, getPost} from "../../utils";


describe("NewPostFinal", () => {

  let component, car;

  beforeEach(() => {

    car = getCar();

    const state = store.getState();

    const post = getPost();

    component = render(
      <NewPostFinal
        post={post}
        urls={state.config.urls}
        onAddTag={jest.fn()}
        onSetPost={jest.fn()}
        history={{replace: jest.fn()}}
      />);
  });

  it("checks that NewPostFinal contains input elements", () => {
    expect(component.find("input").length).toBe(2);
  });

  it("checks that NewPostFinal contains button elements", () => {
    expect(component.find("button").length).toBe(1);
  });
});