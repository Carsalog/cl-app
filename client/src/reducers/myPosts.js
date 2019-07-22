import {GET_MY_POSTS, SET_MY_POSTS} from "../actions/types";

const myPosts = (state = [], action) => {
  switch (action.type) {
    case GET_MY_POSTS:
      return action.payload;
    case SET_MY_POSTS:
      return action.payload;
    default:
      return state
  }
};

export default myPosts;