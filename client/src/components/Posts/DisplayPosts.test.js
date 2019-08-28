import React from "react";
import {shallow} from 'enzyme';
import {DisplayPosts} from './DisplayPosts';


describe('DisplayPosts', () => {


  describe('if posts not an empty array', () => {

    const props = {
      onView: jest.fn(),
      onEdit: jest.fn(),
      onDelete: jest.fn(),
      posts: [
        {_id: '1'},
        {_id: '3'}
      ]
    };

    const displayPosts = shallow(<DisplayPosts {...props}/>);

    it('should render properly', function () {
      expect(displayPosts).toMatchSnapshot();
    });

    it('should contains PostItem component', function () {
      expect(displayPosts.find('tbody')
        .children().length).toBe(props.posts.length);
    });
  });

  describe('if posts is an empty array', () => {
    const props = {
      onView: jest.fn(),
      onEdit: jest.fn(),
      onDelete: jest.fn(),
      posts: []
    };
    const displayPosts = shallow(<DisplayPosts {...props}/>);

    it('should not display a table', function () {
      expect(displayPosts.find('table').exists()).toBe(false);
    });

    it('should contains a Link component', function () {
      expect(displayPosts.find('Link').props())
        .toHaveProperty('to', '/posts/new');
    });
  });
});