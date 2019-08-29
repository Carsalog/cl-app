import React from "react";
import {shallow} from "enzyme";
import {Login} from './Login';


describe("Login", () => {

  const props = {

  };
  const login = shallow(<Login {...props}/>);

  it('should render properly', function () {
    expect(login).toMatchSnapshot();
  });

});