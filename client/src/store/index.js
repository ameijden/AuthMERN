// initializing store

import { applyMiddleware, createStore } from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from './reducers/authReducer';


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware())
  );


export default store;

