import React from 'react';
import {shallow} from 'enzyme';
import {RightSite, mapStateToProps, mapDispatchToProps} from './RightSite';
import {getStates} from "../../actions";


describe('RightSide', () => {

  const props = {
    state: {},
    city: {},
    states: [],
    cities: [],
    urls: {
      states: '/states',
      posts: '/posts'
    },
    history: {
      push: jest.fn()
    },
    onGetStates: jest.fn()
  };
  const dispatch = jest.fn();
  const rightSite = shallow(<RightSite {...props}/>);
  jest.spyOn(rightSite.instance(), 'renderStates');
  jest.spyOn(rightSite.instance(), 'renderCities');
  jest.spyOn(rightSite.instance(), 'renderButton');
  rightSite.instance().render();

  it('should render properly', function () {
    expect(rightSite).toMatchSnapshot();
  });

  it('should contains form element', () => {
    expect(rightSite.find('form').exists()).toBe(true);
  });

  it('should call renderStates', () => {
    expect(rightSite.instance().renderStates)
      .toHaveBeenCalled();
  });

  it('should call renderCities', () => {
    expect(rightSite.instance().renderCities)
      .toHaveBeenCalled();
  });

  it('should call renderButton', function () {
    expect(rightSite.instance().renderButton)
      .toHaveBeenCalledWith('submit');
  });

  it('should call onGetStates', function () {
    expect(props.onGetStates)
      .toHaveBeenCalledWith(
        `${props.urls.states}?amount=60`
      );
  });

  it('should initialize state', function () {
    expect(rightSite.instance().state)
      .toMatchObject({data: {state: '', city: ''}});
  });

  describe('if states is not empty', () => {
    props.states = [{_id: "1", name: "test name", }];
    const wrapper = shallow(<RightSite {...props}/>);

    beforeEach(() => {
      props.onGetStates.mockClear();
    });

    it('should not call onGetStates', function () {
      wrapper.instance().componentDidMount();
      expect(props.onGetStates)
        .not.toHaveBeenCalled();
    });
  });

  describe('if state passed', () => {
    const props2 = {...props};
    props2.state = {_id: "test state id"};
    const wrapper = shallow(<RightSite {...props2}/>);
    wrapper.instance().componentDidMount();

    it('should add _id to the component state', function () {
      const {data} = wrapper.instance().state;
      expect(data)
        .toHaveProperty('state', props2.state._id);
      expect(data)
        .toHaveProperty('city', '')
    });
  });

  describe('if state and city passed', () => {
    const props2 = {...props};
    props2.state = {_id: "test state id"};
    props2.city = {_id: "test city id"};
    const wrapper = shallow(<RightSite {...props2}/>);
    wrapper.instance().componentDidMount();

    it('should add city and state ids to the component state', function () {
      const {data} = wrapper.instance().state;

      expect(data).toHaveProperty('state', props2.state._id);
      expect(data).toHaveProperty('city', props2.city._id);
    });
  });

  it('should map state to props', function () {
    const state = {
      state: {_id: "state id"},
      states: [1, 2, 3],
      city: {_id: "city id"},
      cities: [1, 2, 3, 4],
      config: { urls: {} }
    };
    const expectedProps = {
      state: {_id: "state id"},
      states: [1, 2, 3],
      city: {_id: "city id"},
      cities: [1, 2, 3, 4],
      urls: {}
    };

    expect(mapStateToProps(state))
      .toMatchObject(expectedProps)
  });

  it('should map dispatch to props', function () {
    expect(mapDispatchToProps(dispatch))
      .toHaveProperty('onGetStates')
  });

  it('should call dispatch', function () {
    mapDispatchToProps(dispatch).onGetStates("");
    expect(dispatch).toHaveBeenCalled();
  });

  it('should call history.push', function () {
    rightSite.instance().doSubmit();
    expect(props.history.push)
      .toHaveBeenCalledWith(props.urls.posts);
  });
});