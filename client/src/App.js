import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./styles/App.css";
import Home from "./Views/Home";
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
import CreateBoard from "./Views/CreateBoard";
import Boards from "./Views/Boards";
import Board from "./Views/Board";
import Favourites from "./Views/Favourites";

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
  }, []);//eslint-disable-line

  return (
    <div className='h-screen flex flex-col w-full'>
      <Navbar></Navbar>
      {submitState.loading === 1 ? (
        <div className="flex-grow">
          <Loading />
        </div>
      ) : (
        <div className="flex-grow flex flex-col overflow-y-auto">
          <div className="flex-grow">
            <Switch>
              <PrivateRoute path='/' exact component={Home} />
              <PrivateRoute path='/profile/:platform?' component={Profile} />
              <PrivateRoute path='/my/favourites' component={Favourites} />
              <RestrictedRoute path='/login/:platform?' component={Login} />
              <RestrictedRoute path='/signup/:platform?' component={SignUp} />
              <Route path='/boards/new' exact component={CreateBoard} />
              <Route path='/boards/:id' exact component={Board} />
              <Route path='/:user/boards' component={Boards} />
              <Route exact path='/503' component={Page503} />
              <Route exact path='/*' component={Page404} />
            </Switch>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
