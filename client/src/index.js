import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";

// import reportWebVitals from './reportWebVitals';

library.add(faFacebook, faInstagram, faEnvelope, faTimes, faSpinner);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
