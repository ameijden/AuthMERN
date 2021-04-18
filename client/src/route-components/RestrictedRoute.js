import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const RestrictedRoute = (props) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return !loggedIn ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to='/' />
  );
};
export default RestrictedRoute;
