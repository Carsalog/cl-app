import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import * as types from "./types";
import * as actions from './index';
import http from '../services/http';


describe("actions", () => {

  let url, action, expectedActions, data;
  const createMockStore = configureMockStore([thunk]);
  const mockStore = createMockStore({});

  const setMock = () => {
    moxios.stubRequest(url, {
      status: 200,
      response: data
    });
    mockStore.dispatch(action(url));
  };

  const check = done => moxios.wait(() => {
    expect(mockStore.getActions()).toMatchObject(expectedActions);
    done();
  });

  beforeAll(() => {
    http.setBaseURL();
  });

  beforeEach(() => {
    moxios.install();
    data = [1, 2, 3];
  });

  afterEach(() => {
    moxios.uninstall();
    mockStore.clearActions();

    url = '';
    action = null;
    expectedActions = null;
  });

  it(`should update confirms in the store`, () => {
    action = actions.updateZipConfirm;
    expectedActions = [{type: types.UPDATE_CONFIRMS, payload: true}];
    expect(mockStore.dispatch(action(true)))
      .toEqual(expectedActions[0]);
  });

  it(`should sdd cities to the store`, done => {
    action = actions.getCities;
    url = `/api/cities`;
    expectedActions = [{type: types.GET_CITIES, payload: data}];
    setMock();

    return check(done);
  });

  it("should return action undefended if backend send error from /api/cities", async done => {
    action = actions.getCities;
    url = `/api/cities`;
    data = null;
    expectedActions = [{type: types.GET_CITIES, payload: data}];
    setMock();


    moxios.wait(async () => {
      expect(mockStore.getActions()).toEqual([]);
      done();
    });
  });

  it('should set make to the store', done => {
    const _id = '123';
    const url = `/api/make/${_id}`;
    action = actions.getMake;
    data = {_id: _id};
    expectedActions = [{type: types.SET_MAKE, payload: data}];

    setMock(url, data);

    return check(done)
  });

  it(`should set makes to the store`, done => {
    action = actions.getMakes;
    url = '/api/makes';
    expectedActions = [{type: types.GET_MAKES, payload: data}];

    setMock();

    return check(done);
  });

  it("should add transmissions to the store", done => {
    action = actions.getTransmissions;
    url = '/api/transmissions';
    expectedActions = [{type: types.SET_TRANSMISSIONS, payload: data}];

    setMock();

    return check(done);
  });

  it(`should add post to the store`, async done => {
    url = `/api/posts/1`;
    action = actions.getPost;
    data = {_id: "1"};
    expectedActions = [{type: types.GET_POST, payload: data}];
    setMock();

    return check(done);
  });

  it(`should add posts to the store`, async done => {
    url = `/api/posts`;
    action = actions.getPosts;
    expectedActions = [{type: types.GET_POSTS, payload: data}];
    setMock();

    return check(done);
  });

  it('should delete post', function () {
    url = '/post/1';
    data = {info: "post 1 was removed"};
    moxios.stubRequest(url, {
      status: 200,
      response: data
    });

    return actions.removePost(url).then(res => {
      expect(res.data).toMatchObject(data);
    })
  });

  it(`should add users posts to the store`, done => {
    url = `/api/posts/by/user/1`;
    data = [{_id: "1"}, {_id: "3"}, {_id: "8"}];
    action = actions.getUsersPosts;
    expectedActions = [{type: types.GET_MY_POSTS, payload: data}];
    setMock();

    return check(done);
  });

  it(`should add states to the store`, done => {
    url = `/api/posts/by/user/1`;
    data = [{_id: "1"}, {_id: "2"}, {_id: "4"}];
    action = actions.getStates;
    expectedActions = [{type: types.GET_STATES, payload: data}];
    setMock();

    return check(done);
  });

  it(`should set car to the store`, done => {
    url = `/api/posts/by/user/1`;
    data = {_id: "23", vin: "d62ml34gf4d34s"};
    action = actions.getCar;
    expectedActions = [{type: types.SET_CAR, payload: data}];
    setMock();

    return check(done);
  });

  it("should return correct tag", () => {
    url = '/tags/25';
    data = {_id: "25"};
    moxios.stubRequest(url, {
      status: 200,
      response: data
    });

    return actions.getTag(url).then(res => {
      expect(res.data).toMatchObject(data);
    })
  });

  it("should return correct state", () => {
    url = '/states/18';
    data = {_id: "18"};
    moxios.stubRequest(url, {
      status: 200,
      response: data
    });

    return actions.getState(url).then(res => {
      expect(res.data).toMatchObject(data);
    });
  });

  it("should return correct update post", () => {
    url = '/posts/1';
    data = {_id: "1", description: "description"};
    moxios.stubRequest(url, {
      status: 200,
      response: data
    });

    return actions.updatePost(url, data).then(res => {
      expect(res.data).toMatchObject(data);
    });
  });

  it("should return correct create post", () => {
    url = '/posts';
    const description = "new post";
    data = {_id: "33", description: description};
    moxios.stubRequest(url, {
      status: 200,
      response: data
    });

    return actions.createPost(url, description).then(res => {
      expect(res.data).toMatchObject(data);
    });
  });

  it("should add user to the store", done => {
    url = '/user';
    action = actions.getUser;
    data = {_id: "82", firstName: "John"};
    expectedActions = [{type: types.SET_USER, payload: data}];

    setMock();

    return check(done);
  });

  it('should add token to the store', done => {
    url = '/auth';
    action = actions.authUser;
    data = {token: '12345'};
    expectedActions = [{type: types.SET_TOKEN, payload: data.token}];

    setMock();

    return check(done);
  });

  it('should not add token to the store if server return an error', done => {
    url = '/auth';
    action = actions.authUser;
    data = null;
    expectedActions = [];

    setMock();

    return check(done);
  });

  it('should add zip data to the store', done => {
    url = '/zip';
    action = actions.getZip;
    data = {
      zip: {_id: '123'},
      state: {_id: '456'},
      city: {_id: '789'}
    };
    expectedActions = [
      {type: types.GET_ZIP, payload: data},
      {type: types.SET_STATE, payload: data.state},
      {type: types.SET_CITY, payload: data.city}
    ];

    setMock();

    return check(done);
  });

  it('should not add zip data to the store', done => {
    url = '/zip';
    action = actions.getZip;
    data = null;
    expectedActions = [];

    setMock();

    return check(done);
  });

  it(`should return action SET_CITY`, () => {
    expect(mockStore.dispatch(actions.setCity({_id: "1"})))
      .toEqual({type: types.SET_CITY, payload: {_id: "1"}});
  });

  it(`should return action SET_MAKE`, () => {
    expect(mockStore.dispatch(actions.setMake({_id: "1"})))
      .toEqual({type: types.SET_MAKE, payload: {_id: "1"}});
  });

  it(`should return action SET_MESSAGE`, () => {
    expect(mockStore.dispatch(actions.setMessage({error: "message"})))
      .toEqual({type: types.SET_MESSAGE, payload: {error: "message"}});
  });

  it(`should return action SET_MODEL`, () => {
    expect(mockStore.dispatch(actions.setModel({_id: "1"})))
      .toEqual({type: types.SET_MODEL, payload: {_id: "1"}});
  });

  it(`should return action SET_POST`, () => {
    expect(mockStore.dispatch(actions.setPost({_id: "1"})))
      .toEqual({type: types.SET_POST, payload: {_id: "1"}});
  });

  it(`should return action SET_STATE`, () => {
    expect(mockStore.dispatch(actions.setState({_id: "1"})))
      .toEqual({type: types.SET_STATE, payload: {_id: "1"}});
  });

  it(`should return action SET_TOKEN`, () => {
    expect(mockStore.dispatch(actions.setToken("token")))
      .toEqual({type: types.SET_TOKEN, payload: "token"});
  });

  it(`should return action SET_USER`, () => {
    expect(mockStore.dispatch(actions.setUser({_id: "1", name: "John"})))
      .toEqual({type: types.SET_USER, payload: {_id: "1", name: "John"}});
  });

  it(`should return action SET_CITIES`, () => {
    expect(mockStore.dispatch(actions.setCities([1, 2, 3])))
      .toEqual({type: types.SET_CITIES, payload: [1, 2, 3]});
  });

  it(`should return action SET_CAR`, () => {
    expect(mockStore.dispatch(actions.setCar({_id: "321", vin: "123"})))
      .toEqual({type: types.SET_CAR, payload: {_id: "321", vin: "123"}});
  });

  it(`should return action ADD_TAG`, () => {
    expect(mockStore.dispatch(actions.addTag({_id: "21"})))
      .toEqual({type: types.ADD_TAG, payload: {_id: "21"}});
  });

  it(`should return action SET_MY_POSTS`, () => {
    expect(mockStore.dispatch(actions.setMyPosts([1, 2, 3, 4])))
      .toEqual({type: types.SET_MY_POSTS, payload: [1, 2, 3, 4]});
  });
});