import React from "react";
import {shallow} from "enzyme";
import {Login} from './Login';


describe("Login", () => {

  const props = {
    text: {
      header: "test login header",
      email: "test email",
      password: "test password",
      loading: "test loading"
    },
    path: {
      register: "test register"
    }
  };
  const login = shallow(<Login {...props}/>);

  it('should render properly', function () {
    expect(login).toMatchSnapshot();
  });

});