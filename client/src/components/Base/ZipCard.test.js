import React from 'react';
import {shallow} from 'enzyme';
import {ZipCard} from './ZipCard';

describe('ZipCard', () => {

  const props = {
    zip: {
      id: "00000",
      city: {
        name: 'test city'
      },
      state: {
        abbreviation: "AA"
      }
    },
    zipMsg: 'test message',
    renderLink: jest.fn(),
    zipConfirm: jest.fn()
  };
  const zipCard = shallow(<ZipCard {...props}/>);

  it('should render properly', function () {
    expect(zipCard).toMatchSnapshot();
  });

  it('should call renderLink', function () {
    expect(props.renderLink)
      .toHaveBeenCalledWith(
        "confirm",
        "/posts",
        props.zipConfirm,
        "zip__link zip__link--confirm")
  });
});