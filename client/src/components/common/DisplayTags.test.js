import React from 'react';
import {shallow} from 'enzyme';
import {DisplayTags} from './DisplayTags';

describe('DisplayTags', () => {

  const props = {
    tags: [
      {
        _id: "1",
        name: "tag1"
      },
      {
        _id: "2",
        name: "tag3"
      }
    ],
    show: jest.fn()
  };
  const displayTags = shallow(<DisplayTags {...props}/>);

  it('should render properly', function () {
    expect(displayTags).toMatchSnapshot();
  });

  it('should display tags', function () {
    expect(displayTags.find('.tag').length).toBe(props.tags.length);
  });

  it('should call show function', function () {
    displayTags.find('.tag__text').first().simulate('click');
    expect(props.show).toHaveBeenCalled();
  });

  describe('if there no tags', () => {
      const newProps = {...props};
      newProps.tags = [];

      const wrapper = shallow(<DisplayTags {...newProps}/>);

    it('should not display tags', function () {
      expect(wrapper.find('.tag').length).toBe(0);
    });
  });
});