import {GET_ZIP} from "../actions/types";


export default (state = null, action) => {
  switch (action.type) {
    case GET_ZIP:
      return action.payload;
    default:
      return state;
  }
};
