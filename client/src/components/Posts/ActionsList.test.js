import React from 'react';
import {shallow} from 'enzyme';
import {ActionsList, mapStateToProps} from './ActionsList';

describe('ActionsList', () => {

  const props = {
    edit: {},
    remove: {},
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    post: { _id: 'test post' }
  };
  const actionsList = shallow(<ActionsList {...props}/>);

  it('should render properly', function () {
    expect(actionsList).toMatchSnapshot();
  });

  it('should call onEdit', function () {
    actionsList.find('.posts__list-link--info').simulate('click');
    expect(props.onEdit).toHaveBeenCalled();
  });

  it('should call onDelete', function () {
    actionsList.find('.posts__list-link--remove').simulate('click');
    expect(props.onDelete).toHaveBeenCalled();
  });

  describe('mapStateToProps', () => {
    const state = {
      config: {
        icons: {
          edit: 'test edit icon',
          remove: 'test remove icon'
        }
      }
    };

    const result = mapStateToProps(state);

    it('should contains edit icon', function () {
      expect(result).toHaveProperty('edit', state.config.icons.edit);
    });

    it('should contains remove icon', function () {
      expect(result).toHaveProperty('remove', state.config.icons.remove)
    });
  });
});