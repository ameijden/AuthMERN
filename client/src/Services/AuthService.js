import request from "./Request";
// import axios from "axios";
import CONFIG from "../Services/Config";

// let getInstagramCode = () => {
//     return axios.get();
// }

let userFacebookAuthenticate = (code, type = "login") => {
  return request("post", `auth/facebook`, {
    code: code,
    redirect_uri: CONFIG.FB.REDIRECT_URI.replace("login", type),
    type: type,
  });
};

let userInstagramAuthenticate = (code, type = "login") => {
  return request("post", `auth/instagram`, {
    code: code,
    redirect_uri: CONFIG.INSTAGRAM.REDIRECT_URI.replace("login", type),
    type: type,
  });
};

let login = (credentials) => {
  return request("post", "auth/signin", credentials);
};

let signup = (data) => {
  return request("post", "auth/signup", data);
};

let addEmailLogin = (data) => {
  return request("post", "auth/addEmailLogin", data);
};

let updateSelf = (data) => {
  return request("post", "auth/updateSelf", data);
};

let isLoggedIn = () => {
  return localStorage.getItem("loggedIn") === "true";
};

export const checkAuthState = () => {
  return request("get", "auth/isSignedIn");
};

export const signOut = () => {
  return request("get", "auth/signOut");
};

export const getSelf = () => {
  return request("get", "auth/getSelf");
};

//EXPORTING SERVICE FUNCTIONS
const AuthService = {
  request,
  isLoggedIn,
  checkAuthState,
  login,
  signup,
  signOut,
  getSelf,
  updateSelf,
  addEmailLogin,
  userFacebookAuthenticate,
  userInstagramAuthenticate,
};
export default AuthService;
