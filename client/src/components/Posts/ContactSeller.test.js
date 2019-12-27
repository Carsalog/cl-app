import React from 'react';
import {shallow} from 'enzyme';
import {ContactSeller} from './ContactSeller';
import {getPost, user} from '../../tests/utils'

describe('ContactSeller', () => {

  const post = getPost();
  const props = {
    phone: "phone",
    email: "email",
    post,
    url: '/messages'
  };
  const contactSeller = shallow(<ContactSeller {...props}/>);

  it('should render properly', function () {
    expect(contactSeller).toMatchSnapshot();
  });

  describe('if user defined in props', () => {

    const newProps = {...props};
    newProps.user = user;

    const wrapper = shallow(<ContactSeller {...newProps}/>);
    const state = wrapper.instance().state;

    it('should set user\'s first name into the component state', function () {
      console.log(state);
      expect(state.data.firstName).toBe(user.firstName);
    });

    it('should set user\'s last name into the component state', function () {
      expect(state.data.lastName).toBe(user.lastName);
    });

    it('should set user\'s email into the component state', function () {
      expect(state.data.email).toBe(user.email);
    });

    it('should set user\'s phone number into the component state', function () {
      expect(state.data.phone).toBe(user.phone);
    });

    it('should display seller\'s info', function () {
      wrapper.find('.contact-seller__show').simulate('click');
      expect(wrapper.find('.contact-seller__info-box').exists()).toBe(true);
      expect(wrapper.find('.contact-seller__show').exists()).toBe(false);
    });
  });
});