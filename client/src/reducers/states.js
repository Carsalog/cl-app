import {GET_STATES} from '../actions/types';


const states = (state = [], action) => {
  switch (action.type) {
    case GET_STATES:
      return action.payload;
    default:
      return state;
  }
};

export default states;
