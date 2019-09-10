import React from 'react';
import {shallow} from 'enzyme';
import {LeftSite} from './LeftSite';


describe('LeftSite', () => {
  const urls = {zips: '/zips/test/url'};
  const props = {
    confirms: {
      zip: null
    },
    zip: null,
    config: {
      urls,
      messages: {
        zipMsg: 'test zip message'
      }
    },
    urls,
    onGetZip: jest.fn(),
    onSetZip: jest.fn(),
    onUpdateZipConfirm: jest.fn()
  };
  const leftSite = shallow(<LeftSite {...props}/>);
  jest.spyOn(leftSite.instance(), 'renderInput');
  jest.spyOn(leftSite.instance(), 'renderButton');
  leftSite.instance().render();

  it('make sure that LeftSite contains form element', () => {
    expect(leftSite.find('form').exists())
      .toBe(true);
  });

  it('make sure that LeftSite contains input element', () => {
    expect(leftSite.instance().renderInput)
      .toHaveBeenCalledWith('zip', 'Zip', 'text', true);
  });

  it('make sure that LeftSite contains button element', () => {
    expect(leftSite.instance().renderButton)
      .toHaveBeenCalledWith('submit');
  });

  it('should not contains ZipCard component', function () {
    expect(leftSite.find('#zip-card').exists())
      .toBe(false);
  });

  describe('if called handleSubmit method', () => {
    jest.spyOn(leftSite.instance(), 'doSubmit');
    leftSite.instance().validate = jest.fn();
    const event = {preventDefault: jest.fn()};
    leftSite.instance().handleSubmit(event);


    it('should call preventDefault method', function () {
      expect(event.preventDefault)
        .toHaveBeenCalledTimes(1)
    });

    it('should call validate method', function () {
      expect(leftSite.instance().validate)
        .toHaveBeenCalled()
    });

    it('should call doSubmit method', function () {
      expect(leftSite.instance().doSubmit)
        .toHaveBeenCalledTimes(1)
    });
  });

  describe('if zip and not confirm.zip', () => {
    props.zip = {_id: "00000"};
    const wrapper = shallow(<LeftSite {...props}/>);
    it('should render ZipCard component', function () {
      expect(wrapper.find('#zip-card').exists())
        .toBe(true);
    });
  });
});