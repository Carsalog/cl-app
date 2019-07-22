import React from "react";
import * as Adapter from 'enzyme-adapter-react-16';
import {render} from "enzyme";
import {Message} from "../../../components/common/Message";


describe("Message", () => {
  let component;

  it("Make sure that Message will display with error parameter", () => {
    component = render(<Message message={{error: "message"}} onDelMessage={jest.fn()} />);
    expect(component.find("strong").length).toBe(1);
    expect(component.find("button").length).toBe(1);
  });

  it("Make sure that Message will display with info parameter", () => {
    component = render(<Message message={{info: "message"}} onDelMessage={jest.fn()} />);
    expect(component.find("strong").length).toBe(1);
    expect(component.find("button").length).toBe(1);
  });

  it("Make sure that Message will not display with if message is null", () => {
    component = render(<Message message={null} onDelMessage={jest.fn()} />);
    expect(component.find("strong").length).toBe(0);
    expect(component.find("button").length).toBe(0);
  });
});