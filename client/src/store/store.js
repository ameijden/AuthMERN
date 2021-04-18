
import {
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

// import uiReducer from "./reducers/uiReducer";
import authReducer from "./reducers/authReducer";
const middleware = [
    ...getDefaultMiddleware()
  /*YOUR CUSTOM MIDDLEWARES HERE*/
];

//creating store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware,
});
export default store;
