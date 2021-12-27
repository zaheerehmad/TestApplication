// A wrapper for <Route> that redirects to the login

import React, { createContext, useContext, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./ProvideAuth";

// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.getUser() ? (
                    <>
                        {children}
                        <br />
                    </>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
export default PrivateRoute;