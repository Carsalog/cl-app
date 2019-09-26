import React from 'react';
import {shallow} from 'enzyme';
import {Register} from './Register';


describe("Register", () => {

  const props = {
    user: 'test ',
    messages: 'test ',
    text: {
      header: 'test register header',
      email: 'test email',
      firstName: {
        name: 'test firstName',
        label: 'test First Name'
      },
      lastName: {
        name: 'test lastName',
        label: 'test Last Name'
      },
      phone: {
        name: 'test phone',
        label: 'test Phone number'
      },
      password: {
        name: 'test password',
        label: 'test password',
        type: 'test password'
      },
      passwordConf: {
        name: 'test passwordConf',
        label: 'test Confirm password',
        type: 'test password'
      },
      button: 'test button text',
      link: 'test link text'
    },
    path: {
      register: 'register path',
      login: 'login path',
      profile: 'profile path'
    }
  };
  const register = shallow(<Register {...props}/>);

  it('should render properly', function () {
    expect(register).toMatchSnapshot();
  });
});