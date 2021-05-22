import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

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
import { useDispatch, useSelector } from "react-redux";

import RestrictedRoute from "./route-components/RestrictedRoute";
import PrivateRoute from "./route-components/PrivateRoute";
import Footer from "./Components/Footer";
import Loading from "./Components/Loading";
import CreateBoard from "./Views/CreateBoard";
import Boards from "./Views/Boards";
import Board from "./Views/Board";
import Favourites from "./Views/Favourites";
import ProfileSetup from "./Views/ProfileSetup";

function App(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth)

  const [detailsCheck, setDetailsCheck] = useState(false)
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


  useEffect(() => {
    submitState.loading !== 1 && detailsCheck && history.push('/profile/setup');
  }, [detailsCheck])//eslint-disable-line


  useEffect(() => {
    if (!auth.loggedIn) return
    let details = {
      firstname: auth.user.firstname,
      lastname: auth.user.lastname,
      age: auth.user.age,
      street: auth.user.street,
      city: auth.user.city,
      zipcode: auth.user.zipcode,
    };

    setDetailsCheck(hasNull(details));
    // console.log(detailsCheck);
  }, [auth]);//eslint-disable-line


  const hasNull = (target) => {
    for (var member in target) {
      if (target[member] === null) return true;
    }
    return false;
  }

  return (
    <div className='h-screen flex flex-col w-full'>
      {!detailsCheck && <Navbar />}
      {submitState.loading === 1 ? (
        <div className="flex-grow">
          <Loading />
        </div>
      ) : (
        <div className="flex-grow flex flex-col overflow-y-auto">
          <div className="flex-grow">
            <Switch>
              <PrivateRoute path='/' exact component={Home} />
              <PrivateRoute path='/profile/setup' exact component={ProfileSetup} />
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
            {!detailsCheck && <Footer />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
