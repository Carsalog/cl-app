import {SET_CITY} from "../actions/types";


export default (state = {}, action) => {

  switch (action.type) {
    case SET_CITY:
      return action.payload;
    default:
      return state
  }
};
