import React from "react";
import {shallow} from "enzyme";
import Item from "./Item";

describe('Item', () => {

  describe('if currentItem and item has different properties', () => {
    const props = {
      currentItem: {property: '1'},
      property: 'property',
      item: {property: '2'},
      onItemSelect: jest.fn()
    };
    const item = shallow(<Item {...props}/>);

    it('should render properly', function () {
      expect(item).toMatchSnapshot();
    });

    it('should not add `active` to the class attribute', function () {
      expect(item.props().className).not.toContain('active');
    });

    it('should call on onItemSelect', function () {
      item.simulate('click');
      expect(props.onItemSelect).toHaveBeenCalledWith(props.item);
    });
  });

  describe('if currentItem and item has same property', () => {
    const props = {
      currentItem: {property: '2'},
      property: 'property',
      item: {property: '2'},
      onItemSelect: jest.fn()
    };
    const item = shallow(<Item {...props}/>);

    it('should contains `active` class', function () {
      expect(item.props().className).toContain('active');
    });
  });
});