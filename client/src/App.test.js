import React from "react";
import {shallow} from "enzyme";
import App from "./App";


describe("Tests for App", () => {
  let app;

  beforeAll(() => {
    app = shallow(<App />);
  });

  it('should render properly', function () {
    expect(app).toMatchSnapshot();
  });

  it("checks that App contains Nav component", () => {
    expect(app.find('Header').exists()).toBe(true);
  });

  it("checks that App contains Footer component", () => {
    expect(app.find('Connect(Footer)').exists()).toBe(true);
  });

  it("checks that App contains Router component", () => {
    expect(app.find('Connect(Router)').exists()).toBe(true);
  });

  it("checks that App contains Message component", () => {
    expect(app.find('Connect(Message)').exists()).toBe(true);
  });
});