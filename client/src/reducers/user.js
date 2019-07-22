import {SET_USER, LOGOUT} from "../actions/types";


export default (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
};
