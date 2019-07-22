import {SET_MODEL} from "../actions/types";


const model = (state = null, action) => {
  if (action.type === SET_MODEL) return action.payload;
  return state
};

export default model;