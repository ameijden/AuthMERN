// Initial State
import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  loggedIn: localStorage.getItem("loggedIn") === "true",
  user: {
    _id: null,
    role: null,
    firstname: null,
    lastname: null,
    email: null,
    username: null,
    age: null,
    street: null,
    zipcode: null,
    city: null,
    password: null,
    facebook_id: null,
    instagram_id: null,
  },
};

//Reducer
const authSlice = createSlice({
  //slice name -> all the actions dispatched to reducers of this slice will accompany this name i.e ui/[action.type]
  name: "auth",
  //slice initial state
  initialState: authInitialState,
  //slice reducers
  reducers: {
    //reducer objects here
    logIn: (state, action) => {
      //   console.log(action.payload);
      state.user = Object.assign(state.user, action.payload.user);
      state.loggedIn = true;
      localStorage.setItem("loggedIn", true);
    },
    logOut: (state, action) => {
      state.loggedIn = false;
      state.user = authInitialState.user;
      localStorage.setItem("loggedIn", false);
      //   console.log("Signed Out From Front End");
    },
  },
  extraReducers: {
    //sendRefreshToken reducers
    // [sendRefreshToken.pending]: state => { },
    // [sendRefreshToken.rejected]: (state, action) => {
    //     state.loggedIn = false
    //     state.token = null
    //     state.refreshToken = null
    //     state.user = authInitialState.user
    // },
    // [sendRefreshToken.fulfilled]: (state, action) => {
    //     state.loggedIn = true
    //     state.token = action.payload.token
    //     state.refreshToken = action.payload.refreshToken
    // },
    /*logIn reducers*/
    // [logIn.pending]: state => { },
    // [logIn.rejected]: (state, action) => {
    //     state.loggedIn = false
    //     state.token = null
    //     state.refreshToken = null
    //     state.user = authInitialState.user
    // },
    // [logIn.fulfilled]: (state, action) => {
    //     state.loggedIn = true
    //     state.user = action.payload.user
    // },
    //getSelf reducers
    // [updateUser.pending]: (state) => {},
    // [updateUser.rejected]: (state, action) => {
    //   state.loggedIn = false;
    //   state.token = null;
    //   state.refreshToken = null;
    //   state.user = authInitialState.user;
    // },
    // [updateUser.fulfilled]: (state, action) => {
    //   state.loggedIn = true;
    //   state.user = action.payload;
    // },
  },
});

//getting actions from authSlice
export const { logOut, logIn } = authSlice.actions;

//getting reducers from authSlice
const authReducer = authSlice.reducer;

export default authReducer;
