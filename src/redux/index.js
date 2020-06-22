/* eslint-disable no-underscore-dangle */
import { combineReducers, createStore } from 'redux';

import * as reducers from './reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
