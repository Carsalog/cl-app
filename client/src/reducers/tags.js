import {SET_TAGS, ADD_TAG} from "../actions/types";


const tags = (state = [], action) => {
  switch (action.type) {
    case SET_TAGS:
      return action.payload;
    case ADD_TAG:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default tags;