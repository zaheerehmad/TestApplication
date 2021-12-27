import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ROOT, DASHBOARD, PAGE1, AUTH_PAGE1 } from "./CONSTANTS";
import Login from "./Auth/Login";
import PrivateRoute from "./Auth/PrivateRoute";
import { useAuth } from "./Auth/ProvideAuth";
import Dashboard from "../pages/Dashboard";

export const RouterConfig = () => {
  let auth = useAuth();

  return (
    <div>
      <Switch>
        {/* List all public routes here */}
         <Route
                exact
                path="/"
                render={() => {
                    return (
                      auth.getUser() ?
                      <Redirect to="/dashboard" /> :
                      <Redirect to="/login" /> 
                    )
                }}
              />
        <Route path='/login'>
        <Login />
        </Route>

        {/* List all private/auth routes here */}
        <PrivateRoute path={DASHBOARD}>
          <Dashboard />
        </PrivateRoute>

        {/* Non found pages handling */}
        <Route path="*" render={() => {
                    return (
                      auth.getUser() ?
                      <Redirect to="/dashboard" /> :
                      <Redirect to="/login" /> 
                    )
                }}>
        </Route>
      </Switch>
    </div>
  );
};
