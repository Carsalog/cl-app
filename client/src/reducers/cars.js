import {GET_CARS} from "../actions/types";

const cars = (state = [], action) => {
  switch (action.type) {
    case GET_CARS:
      return action.payload;
    default:
      return state;
  }
};

export default cars;