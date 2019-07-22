import http from "./http";
import {store} from "../loader";
import {SET_MESSAGE, SET_USER, SET_TOKEN} from "../actions/types";
import auth from "./auth";

export function updateToken(usr) {

  const credentials = {
    email: usr.email,
    password: usr.password
  };
  auth.login(credentials).then(res => {
    if (res && res.data)
      store.dispatch({type: SET_TOKEN, payload: res.data})
  });
}

export const register = async user => {
  /**
   * Send request to the backend with user data,
   * if response return
   */


  const { urls } = (store.getState()).config;

  const res = await http.post(`${urls.users}`, user);

  if (res) await store.dispatch({
    type: SET_MESSAGE,
    payload: {info: "Registration complete! Sign in please."}});
  return res;
};

export const update = async usr => {

  const { config, user } = store.getState();

  const res = await http.put(`${config.urls.users}/${user._id}`, usr);
  if (res) {
    updateToken(usr);
    store.dispatch({
      type: SET_MESSAGE,
      payload: {info: "Your information is updated"}});
    store.dispatch({
      type: SET_USER,
      payload: res.data});
  }

  return res;
};