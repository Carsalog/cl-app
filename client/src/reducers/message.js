import {SET_MESSAGE, DEL_MESSAGE} from "../actions/types";


const message = (state = null, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return action.payload;
    case DEL_MESSAGE:
      return null;
    default:
      return state;
  }
};

export default message;