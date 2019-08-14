import { store } from "../loader";
import {decodeUser} from "../utils/tools";
import {setToken, setUser, authUser} from "../actions";

const auth = {};

auth.retrieveUser = token => {
  const user = decodeUser(token);
  if (user) store.dispatch(setUser(user));
};

auth.login = credentials => {
  const state = store.getState();
  return store.dispatch(authUser(`${state.config.urls.auth}`, credentials));
};

auth.logout = () => {
  store.dispatch(setToken(null));
  store.dispatch(setUser(null))
};

auth.getToken = () => store.getState().token;

export default auth;
