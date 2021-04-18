import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./styles/App.css";
import MainPage from "./Views/MainPage";
import Navbar from "./Components/Navbar";
import Page503 from "./Views/Page503";
import Page404 from "./Views/Page404";
import Login from "./Views/Login";
import SignUp from "./Views/SignUp";
import Profile from "./Views/Profile";
import AuthService from "./Services/AuthService";
import { logIn, logOut } from "./store/reducers/authReducer";
import { useDispatch } from "react-redux";

import RestrictedRoute from "./route-components/RestrictedRoute";
import PrivateRoute from "./route-components/PrivateRoute";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";

function App() {
  const dispatch = useDispatch();

  const [submitState, setSubmitState] = useState({
    loading: 1,
    response: "",
  });
  useEffect(() => {
    setSubmitState({
      loading: 1,
      response: ""
    })
    AuthService.getSelf()
      .then((res) => {
        dispatch(logIn(res.data));
        setSubmitState({
          loading: 2,
          response: ""
        })
      })
      .catch((err) => {
        // console.log(err);
        dispatch(logOut());
        setSubmitState({
          loading: -1,
          response: ""
        })
      });
  }, []);

  return (
    <div className='h-screen flex flex-col w-full'>
      <Navbar></Navbar>
      {submitState.loading === 1 ? (
        <div className="flex-grow overflow-y-scroll">
          <Loading />
        </div>
      ) : (
        <div className="flex-grow overflow-y-scroll">
          <Switch>
            <PrivateRoute path='/' exact component={MainPage} />
            <PrivateRoute path='/profile/:platform?' component={Profile} />
            <RestrictedRoute path='/login/:platform?' component={Login} />
            <RestrictedRoute path='/signup/:platform?' component={SignUp} />
            <Route exact path='/503' component={Page503} />
            <Route exact path='/*' component={Page404} />
          </Switch>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
