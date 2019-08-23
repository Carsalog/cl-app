import React from "react";
import {shallow} from "enzyme";
import ItemsList from "./itemsList";


describe("ItemsList", () => {
  const items = [
    {_id: "1", name: "name 1"},
    {_id: "2", name: "name 2"},
    {_id: "3", name: "name 3"},
  ];
  const onItemSelect = jest.fn();

  const itemList = shallow(<ItemsList items={items} onItemSelect={onItemSelect} currentItem={null} />);


  it('should render properly', function () {
    expect(itemList).toMatchSnapshot();
  });

  it('should contains Item component', () => {
    expect(itemList.find('Item').length).toBe(items.length);
  });
});