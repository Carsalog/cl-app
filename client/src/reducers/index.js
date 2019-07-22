import {combineReducers} from 'redux';
import posts from './posts';
import post from './post';
import myPosts from './myPosts';
import makes from './makes';
import make from './make';
import model from './model';
import state from './state';
import city from './city';
import config from './config';
import states from './states';
import cities from './cities';
import transmissions from './transmissions';
import confirms from './confirms';
import zip from './zip';
import tags from './tags';
import user from './user';
import message from './message';
import token from './token';
import car from './car';

export default combineReducers({
  states,
  cities,
  posts,
  post,
  myPosts,
  makes,
  make,
  model,
  state,
  city,
  message,
  transmissions,
  confirms,
  zip,
  tags,
  user,
  token,
  car,
  config
});