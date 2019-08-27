import React from 'react';
import {shallow} from 'enzyme';
import {Message, mapDispatchToProps, mapStateToProps} from './Message';


describe('Message', () => {
  const props = {
    message: {type: 'error', message: "error message"},
    onCleanMessage: jest.fn()
  };
  const message = shallow(<Message {...props}/>);


  it('should render properly', function () {
    expect(message).toMatchSnapshot();
  });

  it('should contains type of the message', function () {
    expect(message.text()).toContain(props.message.type);
  });

  it('should contains message text', function () {
    expect(message.text()).toContain(props.message.message);
  });

  it('should map state to props', function () {
    const state = {
      message: null,
      other: []
    };
    expect(mapStateToProps(state)).toMatchObject({message: null})
  });

  it('should map dispatch to props', function () {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    expect(result).toHaveProperty('onCleanMessage');
  });

  it('should call on clean message', function () {
    message.find('button').simulate('click');
    expect(props.onCleanMessage).toHaveBeenCalled();
  });
});