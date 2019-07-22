import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';
import http from "../../../services/http";
import * as action from "../../../actions";
import * as types from "../../../actions/types";
import {store} from "../../../loader";


const mockStore = configureMockStore([thunk]);

describe("actions", () => {

  let base, urls, mStore;
  const setMock = (url, res) => moxios.stubRequest(url, {status: 200, response: res});

  beforeEach(done => {

    const state = store.getState();
    base = state.config.base;
    urls = state.config.urls;

    mStore = mockStore(store.getState());

    moxios.install();
    done();
  });

  afterEach(done => {
    moxios.uninstall();
    done();
  });

  it("checks that checkEmail return correct response", done => {
    const email = "mock@email.com";
    setMock(`${base}${urls.users}/${email}`, true);
    moxios.wait(async () => {
      expect(action.checkEmail(email)).toBeTruthy();
      done();
    });
  });

  it(`should return action - type: ${types.DEL_MESSAGE} and payload: null`, () => {
    expect(mStore.dispatch(action.delMessage()))
      .toEqual({type: types.DEL_MESSAGE, payload: null});
  });

  it(`should return action - type: ${types.UPDATE_CONFIRMS} and payload: true`, () => {
    expect(mStore.dispatch(action.updateZipConfirm(true)))
      .toEqual({type: types.UPDATE_CONFIRMS, payload: true});
  });

  it(`should return action - type: ${types.GET_CITIES} and payload: [1, 2, 3]`, async done => {
    const url = `${base}${urls.cities}`;
    setMock(url, [1, 2, 3]);

    await mStore.dispatch(action.getCities(url));
    moxios.wait(async () => {
      expect(mStore.getActions())
        .toEqual([{type: types.GET_CITIES, payload: [1, 2, 3]}]);
      done();
    });
  });

  it("should return action undefended if backend send error from /api/cities", async done => {
    const url = `${base}${urls.cities}`;
    setMock(url, null);

    await mStore.dispatch(action.getCities(url));
    moxios.wait(async () => {
      expect(mStore.getActions()).toEqual([]);
      done();
    });
  });

  it(`should return action - type: ${types.GET_MAKES} and payload: [1, 2, 3]`, async done => {
    const url = `${base}${urls.makes}`;
    setMock(url, [1, 2, 3]);

    await mStore.dispatch(action.getMakes(url));
    moxios.wait(async () => {
      expect(mStore.getActions())
        .toEqual([{type: types.GET_MAKES, payload: [1, 2, 3]}]);
      done();
    });
  });

  it("should return action undefended if backend send error from /api/makes", async done => {
    const url = `${base}${urls.makes}`;
    setMock(url, null);

    await mStore.dispatch(action.getMakes(url));
    moxios.wait(async () => {
      expect(mStore.getActions()).toEqual([]);
      done();
    });
  });

  it(`should return action - type: ${types.GET_POST} and payload: {_id: "1"}`, async done => {
    const url = `${base}${urls.posts}/1`;
    setMock(url, {_id: "1"});

    await mStore.dispatch(action.getPost(url));
    moxios.wait(async () => {
      expect(mStore.getActions())
        .toEqual([{type: types.GET_POST, payload: {_id: "1"}}]);
      done();
    });
  });

  it("should return action undefended if backend send error from /api/posts/:id", async done => {
    const url = `${base}${urls.posts}/1`;
    setMock(url, null);

    await mStore.dispatch(action.getPost(url));
    moxios.wait(async () => {
      expect(mStore.getActions()).toEqual([]);
      done();
    });
  });

  it(`should return action - type: ${types.GET_POSTS} and payload: [1, 2, 3]`, async done => {
    const url = `${base}${urls.posts}`;
    setMock(url, [1, 2, 3]);

    await mStore.dispatch(action.getPosts(url));
    moxios.wait(async () => {
      expect(mStore.getActions())
        .toEqual([{type: types.GET_POSTS, payload: [1, 2, 3]}]);
      done();
    });
  });

  it("should return action undefended if backend send error from /api/posts", async done => {
    const url = `${base}${urls.posts}`;
    setMock(url, null);

    await mStore.dispatch(action.getPosts(url));
    moxios.wait(() => {
      expect(mStore.getActions()).toEqual([]);
      done();
    });
  });

  it(`should return action - type: ${types.GET_STATES} and payload: [1, 2, 3]`, async done => {
    const url = `${base}${urls.states}`;
    setMock(url, [1, 2, 3]);

    await mStore.dispatch(action.getStates(url));
    moxios.wait(async () => {
      expect(mStore.getActions())
        .toEqual([{type: types.GET_STATES, payload: [1, 2, 3]}]);
      done();
    });
  });

  it("should return action undefended if backend send error from /api/states", async done => {
    const url = `${base}${urls.states}`;
    setMock(url, null);

    await mStore.dispatch(action.getStates(url));
    moxios.wait(async () => {
      expect(mStore.getActions()).toEqual([]);
      done();
    });
  });

  it(`should return user object`, async done => {

    // setMock(`${base}${urls.users}/me`, {_id: "1", name: "john"});

    moxios.wait(async () => {
      const req = moxios.requests.mostRecent();
      req.respondWith({status: 200, response: {_id: "1", name: "john"}})
    });

    const res = await action.getUser();

    expect(res.data).toEqual({_id: "1", name: "john"});
    done();
  });

  it(`should return action - type: ${types.GET_ZIP} and payload`, async done => {
    const url = `${base}${urls.zips}`;
    setMock(url, {_id: "1", state: "3", city: "8"});


    const expectedResponse = [{
      "payload": {"_id": "1", "city": "8", "state": "3"},
      "type": types.GET_ZIP},
      {
        "payload": "3",
        "type": types.SET_STATE
      },
      {"payload": "8", "type": types.SET_CITY}];

    await mStore.dispatch(action.getZip(url));
    moxios.wait(async () => {
      expect(mStore.getActions()).toEqual(expectedResponse);
      done();
    });
  });

  it("should return action undefended if backend send error from /api/zips", async done => {
    const url = `${base}${urls.zips}`;
    setMock(url, null);

    await mStore.dispatch(action.getZip(url));
    moxios.wait(async () => {
      expect(mStore.getActions()).toEqual([]);
      done();
    });
  });

  it(`should return action - type: ${types.SET_CITY} and payload: {_id: "1"}`, () => {
    expect(mStore.dispatch(action.setCity({_id: "1"})))
      .toEqual({type: types.SET_CITY, payload: {_id: "1"}});
  });

  it(`should return action - type: ${types.SET_MAKE} and payload: {_id: "1"}`, () => {
    expect(mStore.dispatch(action.setMake({_id: "1"})))
      .toEqual({type: types.SET_MAKE, payload: {_id: "1"}});
  });

  it(`should return action - type: ${types.SET_MESSAGE} and payload: {error: "message"}`, () => {
    expect(mStore.dispatch(action.setMessage({error: "message"})))
      .toEqual({type: types.SET_MESSAGE, payload: {error: "message"}});
  });

  it(`should return action - type: ${types.SET_MODEL} and payload: {_id: "1"}`, () => {
    expect(mStore.dispatch(action.setModel({_id: "1"})))
      .toEqual({type: types.SET_MODEL, payload: {_id: "1"}});
  });

  it(`should return action - type: ${types.SET_POST} and payload: {_id: "1"}`, () => {
    expect(mStore.dispatch(action.setPost({_id: "1"})))
      .toEqual({type: types.SET_POST, payload: {_id: "1"}});
  });

  it(`should return action - type: ${types.SET_STATE} and payload: {_id: "1"}`, () => {
    expect(mStore.dispatch(action.setState({_id: "1"})))
      .toEqual({type: types.SET_STATE, payload: {_id: "1"}});
  });

  it(`should return action - type: ${types.SET_TOKEN} and payload: "token"`, () => {
    expect(mStore.dispatch(action.setToken("token")))
      .toEqual({type: types.SET_TOKEN, payload: "token"});
  });

  it(`should return action - type: ${types.SET_USER} and payload: {_id: "1", name: "John"}`, () => {
    expect(mStore.dispatch(action.setUser({_id: "1", name: "John"})))
      .toEqual({type: types.SET_USER, payload: {_id: "1", name: "John"}});
  });
});