import request from './Request';
import axios from "axios"
import CONFIG from '../Services/Config'


let getFacebookCode = () => {
    return axios.get(`${CONFIG.FB.ACCESS_TOKEN_URL}?
    client_id=${CONFIG.FB.CLIENT_ID}
   &redirect_uri=${CONFIG.FB.REDIRECT_URI}`);
}

let getInstagramCode = () => {
    return axios.get(`${CONFIG.INSTAGRAM.ACCESS_TOKEN_URL}?
    client_id=${CONFIG.INSTAGRAM.CLIENT_ID}
   &redirect_uri=${CONFIG.INSTAGRAM.REDIRECT_URI}`);
}

let login = (credentials) => {
    return request('post', 'login', credentials);
}

let signup = (data) => {
    return request('post', 'signup', data);
}

let saveToken = (token) => {
    localStorage.setItem('auth-token', token);
}

let getToken = () => {
    let token = localStorage.getItem('auth-token');
    return token;
}

let getUserDetails = () => {
    const token = getToken();
    let payload;
    if (token) {
        payload = token.split('.')[1];
        payload = window.atob(payload);
        return JSON.parse(payload);
    } else {
        return null;
    }
}

let isLoggedIn = () => {
    const user = getUserDetails();
    if (user) {
        return user.exp > Date.now() / 1000;
        // return true;
    } else {
        return false;
    }
}

let checkAuthState = () => {
    return request('get', 'loginStatus');
}

let logout = () => {
    localStorage.removeItem('auth-token');
}

//EXPORTING SERVICE FUNCTIONS
const AuthService = {
    request,
    saveToken,
    getToken,
    getUserDetails,
    isLoggedIn,
    checkAuthState,
    login,
    signup,
    logout,
};
export default AuthService;
