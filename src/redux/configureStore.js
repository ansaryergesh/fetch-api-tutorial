import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Words} from './reducer/Words';

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({
        words: Words,
      }),
      applyMiddleware(thunk, logger),
    );
  
    return store;
};