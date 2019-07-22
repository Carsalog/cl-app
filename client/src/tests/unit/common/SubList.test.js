import React from "react";
import {shallow} from "enzyme";
import SubList from "../../../components/common/subList";
import ItemsList from "../../../components/common/itemsList";


describe("SubList", () => {
  let component;

  it("Make sure that SubList will not display ItemsList component if make={null}", () => {
    component = shallow(<SubList models={[{_id: "1"}]} onModelSelect={jest.fn()} model={null} make={null} />);
    expect(component.find(ItemsList).length).toBe(0);
  });


  it("Make sure that SubList will display ItemsList component if make={true}", () => {
    component = shallow(<SubList models={[{_id: "1"}]} onModelSelect={jest.fn()} model={null} make={true} />);
    expect(component.find(ItemsList).length).toBe(1);
  });

});