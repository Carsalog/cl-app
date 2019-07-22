import http from "../services/http";
import {store} from "../loader";
import * as types from "./types";


export const checkEmail = email => http.get(`${(store.getState()).config.urls.users}/${email}`);

export const delMessage =  () => dispatch => dispatch({type: types.DEL_MESSAGE, payload: null});

export const updateZipConfirm = confirms => dispatch => dispatch({type: types.UPDATE_CONFIRMS, payload: confirms});

export const getCities = url => dispatch => {
  http.get(url).then(res => {
    if (res && res.data) dispatch({type: types.GET_CITIES, payload: res.data});
  });
};

export const getMake = url => dispatch => {
  http.get(url).then(res => {
    if (res && res.data) dispatch({type: types.SET_MAKE, payload: res.data});
  });
};

export const getMakes = url => dispatch => {
  http.get(url).then(res => {
    if (res && res.data) dispatch({type: types.GET_MAKES, payload: res.data});
  });
};

export const getTransmissions = url => dispatch => {
  http.get(url).then(res => {
    if (res && res.data) {
      const transmissions = res.data.map(x => {
        const trns = {...x};
        trns.name = x.type;
        delete trns.type;
        return trns;
      });
      dispatch({type: types.SET_TRANSMISSIONS, payload: transmissions});
    }
  });
};

export const getPost = url => dispatch => {
  http.get(url).then(res => {
    if (res && res.data) dispatch({type: types.GET_POST, payload: res.data});
  });
};

export const removePost = url => http.delete(url);

export const getPosts = url => dispatch => {
  http.get(url).then(res => {
    if (res && res.data) dispatch({type: types.GET_POSTS, payload: res.data});
  });
};

export const getUsersPosts = url => dispatch => {
  http.get(url).then(res => {
    if (res && res.data) dispatch({type: types.GET_MY_POSTS, payload: res.data});
  });
};

export const getStates = url => dispatch => {
  http.get(url).then(res => {
    if (res && res.data) dispatch({type: types.GET_STATES, payload: res.data});
  });
};

export const getCar = url => dispatch => {
  http.get(url).then(res => {
    if (res && res.data) dispatch({type: types.SET_CAR, payload: res.data});
  });
};

export const getTag = url => http.get(url);

export const getState = url => http.get(url);

export const updatePost = (url, post) => http.patch(url, post);

export const createPost = (url, data) => http.post(url, data);

export const getUser = () => http.get(`${store.getState().config.urls.users}/me`);

export const getZip = url => dispatch => {
  http.get(url).then(res => {if (res && res.data) {
      dispatch({type: types.GET_ZIP, payload: res.data});
      dispatch({type: types.SET_STATE, payload: res.data.state});
      dispatch({type: types.SET_CITY, payload: res.data.city});
    }});};

export const setCity = city => dispatch => dispatch({type: types.SET_CITY, payload: city});

export const setMake = make => dispatch => dispatch({type: types.SET_MAKE, payload: make});

export const setMessage = message => dispatch => dispatch({type: types.SET_MESSAGE, payload: message});

export const setModel = model => dispatch => dispatch({type: types.SET_MODEL, payload: model});

export const setPost =  post => dispatch => dispatch({type: types.SET_POST, payload: post});

export const setState = state => dispatch => dispatch({type: types.SET_STATE, payload: state});

export const setToken = token => dispatch => dispatch({type: types.SET_TOKEN, payload: token});

export const setUser = user => dispatch => dispatch({type: types.SET_USER, payload: user});

export const setCities = cities => dispatch => dispatch({type: types.SET_CITIES, payload: cities});

export const setCar = car => dispatch => dispatch({type: types.SET_CAR, payload: car});

export const addTag = tag => dispatch => dispatch({type: types.ADD_TAG, payload: tag});

export const setMyPosts = posts => dispatch => dispatch({type: types.SET_MY_POSTS, payload: posts});
