import React from 'react';
import {shallow} from 'enzyme';
import AdminButton from './AdminButton';


describe('AdminButton', () => {

  it('should render properly', function () {
    const props = {su: true};
    const adminButton = shallow(<AdminButton {...props}/>);
    expect(adminButton).toMatchSnapshot();
  });

  it('should return null if su is false', function () {
    expect(AdminButton({su: false})).toBe(null);
  });
});