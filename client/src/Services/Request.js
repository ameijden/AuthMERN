import axios from "axios";
import CONFIG from "../Services/Config";

axios.defaults.withCredentials = true;
const SERVER = CONFIG.SERVER + "/api";

let request = (method, extension, data = null, responseTypeFile = false) => {
  //setting up headers
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // let token = localStorage["token"];
  // if (token) {
  //     config.headers["Authorization"] = `Bearer ${token}`;
  // }

  //POST Requests
  if (method === "post") {
    // if (responseTypeFile) {
    //     config['responseType'] = 'blob'
    // }
    // console.log('request received file')
    // console.log(data)
    return axios.post(`${SERVER}/${extension}`, data, config);
  }
  //PUT Requests
  else if (method === "put") {
    return axios.put(`${SERVER}/${extension}`, data, config);
  }
  //GET Requests
  else if (method === "get") {
    if (data != null) {
      return axios.get(`${SERVER}/${extension}/${data}`, config);
    } else {
      return axios.get(`${SERVER}/${extension}`, config);
    }
  }
  //DELETE Requests
  else if (method === "delete") {
    if (data != null) {
      return axios.delete(`${SERVER}/${extension}/${data}`, config);
    } else {
      return axios.delete(`${SERVER}/${extension}`, config);
    }
  }
};

export default request;
