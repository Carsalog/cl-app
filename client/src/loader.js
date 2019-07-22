import {applyMiddleware, compose, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Cookies from 'universal-cookie';


// Create cookie object
const cookies = new Cookies();

// const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      ReduxThunk,
    )
  )
);

export {store, cookies};