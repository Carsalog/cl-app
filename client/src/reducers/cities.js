import {GET_CITIES, SET_CITIES} from "../actions/types";


const cities = (state = [], action) => {
  switch (action.type) {
    case GET_CITIES:
      return action.payload;
    case SET_CITIES:
      return action.payload;
    default:
      return state
  }
};

export default cities;