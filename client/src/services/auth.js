import http from "./http";
import { store } from "../loader";
import {decodeUser} from "../utils/tools";
import {getUser, setToken, setUser} from "../actions";
import {SET_USER, SET_TOKEN, SET_MESSAGE} from "../actions/types";

const auth = {};

const handleSetUser = user => store.dispatch({type: SET_USER, payload: user});

const handleUser = (user, token) => {
  if (!user) getUser(token).then(res => {
    if (res && res.data) return handleSetUser(res.data);
    else return null;
  });
  else return handleSetUser(user);

};

const setJWT = token => http.setJwt(token);


const authRequest = async credentials => {
  const state = store.getState();
  const res = await http.post(`${state.config.urls.auth}`, credentials);

  if (res && res.data) {
    if (res.data.error) store.dispatch({type: SET_MESSAGE, payload: res.data});
    if (res.data.token) {
      const {token} = res.data;
      setJWT(token);
      store.dispatch({type: SET_TOKEN, payload: token});
      return token;
    }
  } else return null;

};

auth.retrieveUser = token => handleUser(decodeUser(token), token);

auth.login = async credentials => {
  const token = await authRequest(credentials);
  if (token) {
    auth.retrieveUser(token);
    return token;
  } else return null;
};

auth.logout = () => {
  store.dispatch(setToken(null));
  store.dispatch(setUser(null))
};

auth.getToken = () => store.getState().token;

export default auth;
