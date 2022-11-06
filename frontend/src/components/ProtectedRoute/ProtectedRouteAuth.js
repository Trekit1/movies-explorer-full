import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRouteAuth = ({ way, component: Component, ...props }) => {

  return (
    <Route>
      {() =>
        props.loggedIn === null ? <Component {...props} /> : <Redirect to='/movies'/>
      }
    </Route>
  );
};

export default ProtectedRouteAuth;