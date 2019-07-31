import React from 'react';
import {shallow} from 'enzyme';
import {Social} from './Social';


describe("Social", () => {

  const props = {
    social: [
      {_id: '1'},
      {_id: '2'},
    ]
  };
  const social = shallow(<Social {...props}/>);

  it('should render properly', function () {
    expect(social).toMatchSnapshot();
  });

  it('should contains IconLink component', function () {
    expect(social.find('IconLink').length)
      .toBe(props.social.length);
  });
});