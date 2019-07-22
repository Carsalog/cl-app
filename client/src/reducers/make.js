import {SET_MAKE} from "../actions/types";


export default (state = null, action) => {
  switch (action.type) {
    case SET_MAKE:
      return action.payload;
    default:
      return state;
  }
};
