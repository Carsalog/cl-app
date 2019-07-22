import axios from "axios";
import {store} from "../loader";
import logger from "./logger";
import {SET_MESSAGE} from "../actions/types";


const msg = {error: "Server isn't available"};

export function setJwt (jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const handleError = () => {
  /**
   * Set default error message, and log it
   */
  store.dispatch({type: SET_MESSAGE, payload: msg});
};

const handleServerMessage = e => {
  /**
   * Set server error message, if status code 404
   * redirect user to not found page
   */
  store.dispatch({type: SET_MESSAGE, payload: e.data});
};

const handleBadRequestError = e => {
  /**
   * Handle bad request status codes (4xx)
   */
  logger.log(e);
  if (e && e.data && e.data.error) handleServerMessage(e);
  else handleError();

};


const errorHandle = e => {
  /**
   * Handling errors from the server response. If server is not available,
   * or there is not Internet connection, or remote server has a bug,
   * raise an error.
   *
   * @return: null
   */
  console.log(e);
  const err = e.response && e.response.status >= 400 && e.response.status < 500;
  if (!err) handleError();
  else handleBadRequestError(e.response);

  return null;
};


axios.defaults.baseURL = store.getState().config.api;
axios.interceptors.response.use(null, errorHandle);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  create: axios.create,
  setJwt: setJwt
};