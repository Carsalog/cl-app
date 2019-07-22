import React from "react";
import moxios from "moxios";
import Root from "../../../Root";
import {mount} from "enzyme";
import LeftSide from "../../../components/base/LeftSite";
import {store, cookies} from "../../../loader";
import {GET_ZIP} from "../../../actions/types";


jest.mock('universal-cookie');

describe("Tests for LeftSide component", () => {
  let component, zip;

  beforeEach(() => {

    zip = {
      _id: "98101",
      state: {
        _id: "1",
        abbreviation: "WA",
        name: "washington"
      },
      city: {
        _id: "1",
        name: "seattle"
      }
    };

    component = mount(Root(LeftSide));
  });

  afterEach(() => {
    component.unmount();
  });

  describe("display confirm message", () => {

    beforeEach(() => {
      store.dispatch({type: GET_ZIP, payload: zip});
    });

    afterEach(() => {
      store.dispatch({type: GET_ZIP, payload: null});
    });

    it("make sure that zip code displays", () => {
      expect(component.render().text()).toContain(zip._id);
    });

    it("make sure that city displays", () => {
      expect(component.render().text()).toContain(zip.city.name);
    });

    it("make sure that city displays", () => {
      expect(component.render().text()).toContain(zip.state.abbreviation);
    });
  });

  describe("simulate click button", () => {

    let LeftSideElement, base, urls;
    const setMock = url => moxios.stubRequest(url, { status: 200, response: zip });
    const setState = state => LeftSideElement.setState(state);

    beforeEach(done => {
      LeftSideElement = component.find(LeftSide).childAt(0).instance();

      const state = store.getState();
      base = state.config.base;
      urls = state.config.urls;

      moxios.install();

      done();
    });

    afterEach(done => {
      moxios.uninstall();
      LeftSideElement.setState({data: {zip: ""}});
      store.dispatch({type: GET_ZIP, payload: null});
      component.update();
      done();
    });

    it("checks that handleChange method update zip code", () => {

      // make sure that zip is empty
      expect(LeftSideElement.state.data.zip).toEqual("");

      component.find('input').getDOMNode().value = zip._id;
      component.find('input').simulate('change');
      component.update();

      expect(LeftSideElement.state.data.zip).toEqual(zip._id)
    });

    it("checks that handleChange method update errors", () => {

      // make sure that errors is empty
      expect(LeftSideElement.state.errors).toEqual({});

      // component.find('input').getDOMNode().value = "";
      component.find('input').simulate('change', {target: {value: "invalid"}});
      component.update();

      expect(LeftSideElement.state.errors).toHaveProperty("zip")
    });

    it("check that on submit form redux store will updated", async done => {

      // Set fake request handler
      setMock(`${base}${urls.zips}/${zip._id}`);

      // Make sure that at the store not any data
      expect(store.getState().zip).toBe(null);

      // Update component state
      await setState({ data: { zip: '98101' }, errors: {} });

      // Raise an event
      component.find("form").simulate("submit");

      moxios.wait(async () => {
        expect(store.getState().zip).toEqual(zip);
        done();
      });
    });

    it("checks that on click confirm link store will update", () => {
      expect(store.getState().confirms.zip).toBeFalsy();

      // Init component data
      setState({data: {zip: "98101"}, errors: {}});
      store.dispatch({type: GET_ZIP, payload: zip});

      component.update();
      component.find("a").simulate("click");


      expect(store.getState().confirms.zip).toBeTruthy();
    });

    it("Check that componentDidMount update state if browser have cookie", () => {

      // Mock get method
      cookies.get.mockImplementation(() => "98101");

      // Remount component
      component = mount(Root(LeftSide));
      component.update();

      // Get a new state
      const state = component.find(LeftSide).childAt(0).instance().state;

      expect(state.data).toHaveProperty("zip", zip._id);
    });
  });
});