import http from '../services/http';
import * as types from './types';


const get = (url, dispatch, type) => http.get(url)
  .then(res => {
    if (res && res.data)
      return dispatch({type: type, payload: res.data});
    else return null;
  });

const post = (url, data) => http.post(url, data);

export const updateZipConfirm = confirms => dispatch => dispatch({
  type: types.UPDATE_CONFIRMS,
  payload: confirms
});

export const getCities = url => dispatch => get(url, dispatch, types.GET_CITIES);

export const getMake = url => dispatch => get(url, dispatch, types.SET_MAKE);

export const getMakes = url => dispatch => get(url, dispatch, types.GET_MAKES);

export const getTransmissions = url => dispatch => get(url, dispatch, types.SET_TRANSMISSIONS);

export const getPost = url => dispatch => get(url, dispatch, types.GET_POST);

export const removePost = url => http.delete(url);

export const getPosts = url => dispatch => get(url, dispatch, types.GET_POSTS);

export const getUsersPosts = url => dispatch => get(url, dispatch, types.GET_MY_POSTS);

export const getStates = url => dispatch => get(url, dispatch, types.GET_STATES);

export const getCar = url => dispatch => get(url, dispatch, types.SET_CAR);

export const getTag = url => http.get(url);

export const getState = url => http.get(url);

export const updatePost = (url, post) => http.patch(url, post);

export const createPost = post;

export const getUser = url => dispatch => get(url, dispatch, types.SET_USER);

export const authUser = (url, credentials) => dispatch => http.post(url, credentials)
  .then(res => {
    if (res && res.data && res.data.token) {
      http.setJwt(res.data.token);
      dispatch({type: types.SET_TOKEN, payload: res.data.token});
      return res.data.token;
    } else return null;
  });

export const getZip = url => dispatch => http.get(url).then(res => {
  if (res && res.data) {
    dispatch({type: types.GET_ZIP, payload: res.data});
    dispatch({type: types.SET_STATE, payload: res.data.state});
    dispatch({type: types.SET_CITY, payload: res.data.city});
  }
});


export const setZip = zip => dispatch => {
  let city, state, zip;
  if (zip) {
    state = zip.state;
    city = zip.city;
  } else {
    zip = city = state = null;
  }

  dispatch({type: types.GET_ZIP, payload: zip});
  dispatch({type: types.SET_STATE, payload: state});
  dispatch({type: types.SET_CITY, payload: city});
};

export const setCity = city => dispatch => dispatch({type: types.SET_CITY, payload: city});

export const setMake = make => dispatch => dispatch({type: types.SET_MAKE, payload: make});

export const setMessage = message => dispatch => dispatch({type: types.SET_MESSAGE, payload: message});

export const setModel = model => dispatch => dispatch({type: types.SET_MODEL, payload: model});

export const setPost = post => dispatch => dispatch({type: types.SET_POST, payload: post});

export const setState = state => dispatch => dispatch({type: types.SET_STATE, payload: state});

export const setToken = token => dispatch => dispatch({type: types.SET_TOKEN, payload: token});

export const setUser = user => dispatch => dispatch({type: types.SET_USER, payload: user});

export const setCities = cities => dispatch => dispatch({type: types.SET_CITIES, payload: cities});

export const setCar = car => dispatch => dispatch({type: types.SET_CAR, payload: car});

export const addTag = tag => dispatch => dispatch({type: types.ADD_TAG, payload: tag});

export const setMyPosts = posts => dispatch => dispatch({type: types.SET_MY_POSTS, payload: posts});

export const textToUser = (url, text, sender, receiver) => {
  const data = {
    text,
    sender,
    receiver
  };
  return http.post(url, data);
};

export const getChats = url => dispatch => get(url, dispatch, types.GET_CHATS);
