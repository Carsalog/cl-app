import React from "react";
import {shallow} from "enzyme";
import moxios from "moxios";
import MyPosts from "../../../components/profile/MyPosts";
import DisplayPosts from "../../../components/common/DisplayPosts";
import Root from "../../../Root";
import {store} from "../../../loader";
import {SET_USER} from "../../../actions/types";
import {getPost, user} from "../../utils";


describe("MyPosts", () => {

  let component, state, base, urls;
  const setMock = (url, res, status = 200) => moxios.stubRequest(url, { status, response: res });

  beforeAll(() => {
    state = store.getState();
    base = state.config.base;
    urls = state.config.urls;
    moxios.install();
  });

  beforeEach(() => {
    moxios.install();
    store.dispatch({type: SET_USER, payload: user});

    component = shallow(Root(MyPosts));
  });

  afterAll(() => {moxios.uninstall();});

  it("checks that Me component contains form element", () => {
    const post = getPost();
    const posts = [post];
    setMock(`${base}${urls.posts}/by/user/${user._id}`, posts);
    expect(component.find('DisplayPosts').length).toBe(1);
    // moxios.wait(() => {
    //   // expect(component.text()).toContain(post.mileage);
    //   expect(component.find(DisplayPosts).length).toBe(1);
    //   done();
    // });
  });
});