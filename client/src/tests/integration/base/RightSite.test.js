import React from "react";
import moxios from "moxios";
import Root from "../../../Root";
import {mount} from "enzyme";
import RightSite from "../../../components/base/RightSite";
import {store} from "../../../loader";



describe("RightSite", () => {

  let component, base, urls, states, cities, Element;
  const setMock = (url, res, status = 200) => moxios.stubRequest(url, { status, response: res });

  beforeEach(() => {

    const state = store.getState();
    base = state.config.base;
    urls = state.config.urls;

    states = [
      {_id: "1", name: "state 1"},
      {_id: "2", name: "state 2"},
      {_id: "3", name: "state 3"},
      {_id: "4", name: "state 4"}
    ];

    cities = [
      {_id: "1", name: "city 1", state: states[0]._id},
      {_id: "2", name: "city 2", state: states[1]._id},
      {_id: "3", name: "city 3", state: states[2]._id},
      {_id: "4", name: "city 4", state: states[3]._id}
    ];

  });

  beforeAll(() => {moxios.install();});

  afterAll(() => {moxios.uninstall();});

  describe("redux store is empty", () => {

    const raiseEvent = (id, value, event = 'change') => {
      component.find(id).getDOMNode().value = value;
      component.find(id).simulate(event);
    };

    const dispatchCities = () => {
      store.dispatch({type: "SET_CITIES", payload: cities});
      component.update();
    };

    const setData = () => {
      store.dispatch({type: "SET_STATES", payload: states});
      store.dispatch({type: "SET_STATE", payload: states[0]});
      store.dispatch({type: "SET_CITIES", payload: cities});
      store.dispatch({type: "SET_CITY", payload: cities[0]});

      Element.setState({data: {state: states[0]._id, city: cities[0]._id}});
    };

    beforeEach(() => {

      setMock(`${base}${urls.states}`, states);
      setMock(`${base}${urls.cities}`, cities);

      component = mount(Root(RightSite));
      Element = component.find(RightSite).childAt(0).instance();
    });

    afterEach(() => { });

    it("checks that componentDidMount send request for the states", (done) => {

      moxios.wait(() => {
        expect(store.getState().states).toEqual(states);
        done();
      });
      expect(store.getState().states).toEqual([]);
    });

    it("checks that component update the state.data.state if user select state", () => {

      // Make sure that state is empty
      expect(Element.state.data.state).toEqual("");

      // Raise an event
      raiseEvent("#state", states[0]._id);

      // Make sure that state was updated
      expect(Element.state.data.state).toEqual(states[0]._id)
    });

    it("checks that cleanCity update state and redux store", () => {

      setData();

      Element.cleanCity();

      component.update();

      expect(Element.state.data.city).toEqual("");
      expect(store.getState().city).toEqual({});
    });


    it("checks that component update the state.data.city if user select another state", () => {


      setData();

      //Raise events
      raiseEvent("#state", states[2]._id);
      component.update();

      expect(Element.state.data.city).toEqual("");
    });

    it("should display select element with cities", () => {
      dispatchCities();
      expect(component.find("#city").length).toBe(1);
    });

    it("should update state.data.city, if user select city", () => {
      dispatchCities();
      raiseEvent("#city", cities[2]._id);
      expect(Element.state.data.city).toEqual(cities[2]._id);
    });

    it("make sure that onSubmit user will redirect to /posts", () => {

      setData();

      // Make sure that after component was render uri is home page
      expect(Element.props.location.pathname).toEqual("/");

      // Raise an even
      raiseEvent("form", null, "submit");
      component.update();

      // Make sure that url was changed
      expect(Element.props.location.pathname).toEqual("/posts");
    });

    it("checks city error message in the state ", () => {

      setData();

      // Make sure that state.errors doesn't have property city
      expect(Element.state.errors).not.toHaveProperty("city");

      // Raise an event
      raiseEvent("#city", undefined);

      // Make sure that the event with empty value edd an error to the state
      expect(Element.state.errors).toHaveProperty("city");
    });

    it("checks state error message in the state", () => {
      setData();

      // Make sure that state.errors doesn't have property state
      expect(Element.state.errors).not.toHaveProperty("state");

      // Raise an event
      raiseEvent("#state", undefined);

      // Make sure that the event with empty value edd an error to the state
      expect(Element.state.errors).toHaveProperty("state");
    });
  });

  describe("states uploaded already", () => {

    beforeEach(() => {
      store.dispatch({type: "GET_STATES", payload: states});
      setMock(`${base}${urls.states}`, null);
      component = mount(Root(RightSite));
      Element = component.find(RightSite).childAt(0).instance();
      moxios.wait(async () => {});
    });

    afterEach(() => {
      store.dispatch({type: "GET_STATES", payload: []});
    });

    it("shouldn't make a request if states already loaded", () => {
      expect(store.getState().states).toEqual(states);
    });
  });

});