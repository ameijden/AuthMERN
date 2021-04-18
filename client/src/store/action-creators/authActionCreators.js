// Contains all the asynchronous action creators for authentication module

import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../Services/AuthService";

export const logIn = createAsyncThunk(
  "auth/logIn",
  (data, { rejectWithValue, dispatch }) => {
    return AuthService.login(data)
      .then((res) => {
        //returning result from promise
        return res.data.user;
      })
      .catch((err) => {
        //returning error as a payload of a completed promise
        //we can simply return the [err.response.data.message] as error of a rejected promise
        return rejectWithValue(err.response.data.message);
      });
  },
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  (data, { rejectWithValue, dispatch }) => {
    return AuthService.login(data)
      .then((res) => {
        //returning result from promise
        return res.data.user;
      })
      .catch((err) => {
        //returning error as a payload of a completed promise
        //we can simply return the [err.response.data.message] as error of a rejected promise
        return rejectWithValue(err.response.data.message);
      });
  },
);
