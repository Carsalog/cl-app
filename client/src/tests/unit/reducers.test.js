import {combineReducers} from 'redux';
import posts from '../../reducers/posts';
import post from '../../reducers/post';
import makes from '../../reducers/makes';
import make from '../../reducers/make';
import model from '../../reducers/model';
import state from '../../reducers/state';
import city from '../../reducers/city';
import config from '../../reducers/config';
import states from '../../reducers/states';
import cities from '../../reducers/cities';
import confirms from '../../reducers/confirms';
import zip from '../../reducers/zip';
import tags from '../../reducers/tags';
import user from '../../reducers/user';
import message from '../../reducers/message';
import token from '../../reducers/token';
import cars from "../../reducers/cars";
import car from "../../reducers/car";
import reducers from "../../reducers";
import * as types from "../../actions/types";

jest.mock('redux', () => ({
  combineReducers: jest.fn(reducers => reducers)
}));

test("posts", () => {

  expect(posts(undefined, {type: null})).toEqual([]);

  expect(posts([{_id: 1}], {type: null})).toEqual([{_id: 1}]);

  const action = {type: "GET_POSTS", payload: []};
  expect(posts(undefined, action)).toBe(action.payload);

  action.payload = [{_id: 1, }];
  expect(posts(undefined, action)).toBe(action.payload);
});


test("post", () => {

  expect(post(undefined, {type: null})).toBe(null);

  expect(post({}, {type: null})).toEqual({});

  const action = {type: "GET_POST", payload: {}};
  expect(post(undefined, action)).toBe(action.payload);

  action.type = "SET_POST";
  action.payload = [{_id: 1}];
  expect(post(undefined, action)).toBe(action.payload);
});


test("makes", () => {
  expect(makes(undefined, {type: null})).toEqual([]);

  expect(makes([], {type: null})).toEqual([]);

  const action = {type: "GET_MAKES", payload: [{_id: 1}, {_id: 2}]};
  expect(makes(undefined, action)).toBe(action.payload);
});


test("make", () => {

  expect(make(undefined, {type: null})).toBe(null);

  expect(make({}, {type: null})).toEqual({});

  const action = {type: "SET_MAKE", payload: {_id: 1}};
  expect(make(undefined, action)).toBe(action.payload);
});


test("model", () => {

  expect(model(undefined, {type: null})).toBe(null);

  expect(model({}, {type: null})).toEqual({});

  const action = {type: "SET_MODEL", payload: {_id: 1}};
  expect(model(undefined, action)).toBe(action.payload);
});


test("state", () => {

  expect(state(undefined, {type: null})).toEqual({});

  expect(state({_id: 1}, {type: null})).toEqual({_id: 1});

  const action = {type: "SET_STATE", payload: {_id: 1}};
  expect(state(undefined, action)).toBe(action.payload);
});


test("city", () => {
  expect(city(undefined, {type: null})).toEqual({});

  expect(city({_id: 1}, {type: null})).toEqual({_id: 1});

  const action = {type: "SET_CITY", payload: {_id: 1}};
  expect(city(undefined, action)).toBe(action.payload);
});


test("config", () => {
  const conf = config();
  expect(conf).toHaveProperty("base");
  expect(conf).toHaveProperty("urls");
  expect(conf).toHaveProperty("user");
  expect(conf).toHaveProperty("user");
  expect(conf).toHaveProperty("oauth");
});


test("states", () => {
  expect(states(undefined, {type: null})).toEqual([]);

  expect(states([{_id: 1}], {type: null})).toEqual([{_id: 1}]);

  const action = {type: "GET_STATES", payload: [{_id: 1}, {_id: 2}]};
  expect(states(undefined, action)).toBe(action.payload);
});


test("cities", () => {
  expect(cities(undefined, {type: null})).toEqual([]);

  expect(cities([{_id: 1}], {type: null})).toEqual([{_id: 1}]);

  let action = {type: "GET_CITIES", payload: [{_id: 1}, {_id: 2}]};
  expect(cities(undefined, action)).toBe(action.payload);

  action = {type: "SET_CITIES", payload: [{_id: 1}]};
  expect(cities(undefined, action)).toBe(action.payload);
});


test("confirms", () => {
  const base = {
    zip: false
  };

  expect(confirms(undefined, {type: null})).toEqual(base);

  expect(confirms(base, {type: null})).toEqual(base);

  base.zip = true;
  const action = {type: "UPDATE_CONFIRMS", payload: base};
  expect(confirms(undefined, action)).toBe(action.payload);
});


test("zip", () => {

  expect(zip(undefined, {type: null})).toBe(null);

  expect(zip({_id: 1}, {type: null})).toEqual({_id: 1});

  const action = {type: "GET_ZIP", payload: {_id: 1}};
  expect(zip(undefined, action)).toBe(action.payload);
});


test("tags", () => {

  expect(tags(undefined, {type: null})).toEqual([]);

  expect(tags([{_id: 1}], {type: null})).toEqual([{_id: 1}]);

  let action = {type: types.SET_TAGS, payload: [{_id: 1}]};
  expect(tags(undefined, action)).toBe(action.payload);

  action = {type: types.ADD_TAG, payload: {_id: 2}};
  expect(tags([{_id: 1}], action)).toEqual([{_id: 1}, {_id: 2}]);
});


test("user", () => {

  expect(user(undefined, {type: null})).toBe(null);

  expect(user({_id: 1}, {type: null})).toEqual({_id: 1});

  const action = {type: "SET_USER", payload: {_id: 1}};
  expect(user(undefined, action)).toBe(action.payload);

  action.type = "LOGOUT";
  delete action.payload;
  expect(user(undefined, action)).toBe(null);
});


test("message", () => {
  expect(message(undefined, {type: null})).toBe(null);

  expect(message({error: "error message"}, {type: null})).toEqual({error: "error message"});

  const action = {type: "SET_MESSAGE", payload: {info: "info message"}};
  expect(message(undefined, action)).toBe(action.payload);

  action.type = "DEL_MESSAGE";
  expect(message(undefined, action)).toBe(null);
});


test("token", () => {
  expect(token(undefined, {type: null})).toBe(null);

  expect(token("backendToken", {type: null})).toEqual("backendToken");

  const action = {type: "SET_TOKEN", payload: "token"};
  expect(token(undefined, action)).toBe(action.payload);

  action.type = "DEL_TOKEN";
  expect(token(undefined, action)).toBe(null);
});


test("cars", () => {

  expect(cars(undefined, {type: null})).toEqual([]);

  expect(cars([{_id: 1}], {type: null})).toEqual([{_id: 1}]);

  const action = {type: "GET_CARS", payload: [{_id: 1}, {_id: 2}]};
  expect(cars(undefined, action)).toBe(action.payload);
});


test("car", () => {

  expect(car(undefined, {type: null})).toBe(null);

  expect(car({_id: 1}, {type: null})).toEqual({_id: 1});

  const action = {type: types.SET_CAR, payload: {_id: 1}};
  expect(car(undefined, action)).toBe(action.payload);
});


test("reducers", () => {
  
  expect(reducers).toHaveProperty("states");
  expect(reducers).toHaveProperty("cities");
  expect(reducers).toHaveProperty("posts");
  expect(reducers).toHaveProperty("post");
  expect(reducers).toHaveProperty("makes");
  expect(reducers).toHaveProperty("make");
  expect(reducers).toHaveProperty("model");
  expect(reducers).toHaveProperty("state");
  expect(reducers).toHaveProperty("city");
  expect(reducers).toHaveProperty("message");
  expect(reducers).toHaveProperty("confirms");
  expect(reducers).toHaveProperty("zip");
  expect(reducers).toHaveProperty("user");
  expect(reducers).toHaveProperty("token");
  expect(reducers).toHaveProperty("car");
  expect(reducers).toHaveProperty("config");
  expect(combineReducers).toHaveBeenCalledTimes(1);
});