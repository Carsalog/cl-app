import React from "react";
import {shallow} from 'enzyme';
import {PostItem} from './PostItem';

describe('PostItem', () => {

  let text;
  const props = {
    onView: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    post: {
      _id: "car id",
      year: "2016",
      make: {
        _id: 'make id',
        name: 'make name'
      },
      car: {
        model: 'car model id'
      },
      price: '1234'
    }
  };

  const postItem = shallow(<PostItem {...props}/>);

  beforeAll(() => {
    text = postItem.find('tr').text();
  });

  it('should render properly', function () {
    expect(postItem).toMatchSnapshot();
  });

  it('should contains ActionList', function () {
    expect(postItem.find('Connect(ActionsList)').exists()).toBe(true);
  });

  it('should contains year', function () {
    expect(text).toContain(props.post.year);
  });

  it('should contains make', function () {
    expect(text).toContain(props.post.make.name);
  });

  it('should contains model', function () {
    expect(text).toContain(props.post.car.model)
  });

  it('should contains price', function () {
    expect(text).toContain(props.post.price);
  });
});