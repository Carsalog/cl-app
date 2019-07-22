import {SET_TRANSMISSIONS} from "../actions/types";


export default (state = [], action) => {
  switch (action.type) {
    case SET_TRANSMISSIONS:
      return action.payload;
    default:
      return state;
  }
};
