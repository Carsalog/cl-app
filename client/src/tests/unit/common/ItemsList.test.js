import React from "react";
import {shallow} from "enzyme";
import ItemsList from "../../../components/common/itemsList";


describe("ItemsList", () => {
  let component, items;

  beforeEach(() => {
    items = [
      {_id: "1", name: "name 1"},
      {_id: "2", name: "name 2"},
      {_id: "3", name: "name 3"},
    ];

  });

  it("Make sure that ItemsList display all passed items", () => {
    component = shallow(<ItemsList items={items} onItemSelect={jest.fn()} currentItem={null} />);
    expect(component.find("li").length).toBe(3);
  });

  it("Make sure that ItemsList display all passed items", () => {
    component = shallow(<ItemsList items={items} onItemSelect={jest.fn()} currentItem={items[0]} />);
    expect(component.find("li").length).toBe(3);
  });
});