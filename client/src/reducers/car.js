import {SET_CAR} from "../actions/types"

export default (state = null, action) => {
  switch (action.type) {
    case SET_CAR:
      return action.payload;
    default:
      return state;
  }
};
