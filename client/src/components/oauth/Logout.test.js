import React from 'react';
import {shallow} from 'enzyme';
import {Logout} from './Logout';

jest.mock('../../services/auth', () => ({
  logout: jest.fn()
}));


describe('Logout', () => {
  const auth = require('../../services/auth');
  const props = {
    history: {
      replace: jest.fn()
    }
  };
  const logout = shallow(<Logout {...props}/>);

  it('should render properly', function () {
    expect(logout).toMatchSnapshot();
  });

  it('should call auth.logout', function () {
    expect(auth.logout).toHaveBeenCalled();
  });

  it('should call history.replace', function () {
    expect(props.history.replace).toHaveBeenCalledWith('/');
  });
});