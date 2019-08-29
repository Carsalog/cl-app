import React from 'react';
import {shallow} from 'enzyme';
import {Register} from './Register';


describe("Register", () => {

  const props = {};
  const register = shallow(<Register {...props}/>);

  it('should render properly', function () {
    expect(register).toMatchSnapshot();
  });
});