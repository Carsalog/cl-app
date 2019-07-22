import {GET_POST, SET_POST} from "../actions/types";


const post = (state = null, action) => {
  switch (action.type) {
    case GET_POST:
      return action.payload;
    case SET_POST:
      return action.payload;
    default:
      return state;
  }
};

export default post;