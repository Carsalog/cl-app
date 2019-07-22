import {GET_MAKES} from "../actions/types";


const makes = (state = [], action) => {
  switch (action.type) {
    case GET_MAKES:
      return action.payload;
    default:
      return state;
  }
};

export default makes;