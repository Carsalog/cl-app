import {SET_TOKEN, DEL_TOKEN} from "../actions/types";


export default (state = null, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;
    case DEL_TOKEN:
      return null;
    default:
      return state;
  }
};
