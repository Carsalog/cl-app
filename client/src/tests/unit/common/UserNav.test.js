import React from "react";
import {shallow} from "enzyme";
import {user} from "../../utils";
import {UserNav} from "../../../components/common/userNav";
import Icons from "../../../components/common/Icons";


describe("UserNav", () => {
  let component;

  it("Make sure that UserNav will not display OAuth component if user={true}", () => {
    component = shallow(<UserNav user={user} />);
    expect(component.find(Icons).length).toBe(0);
  });

  it("Make sure that UserNav will display OAuth component if user={null}", () => {
    component = shallow(<UserNav user={null} />);
    expect(component.find(Icons).length).toBe(1);
  });
});