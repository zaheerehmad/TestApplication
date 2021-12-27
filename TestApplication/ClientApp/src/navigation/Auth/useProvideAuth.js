import React, { useState } from "react";
import { getUserDetails } from "./../../services";

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  // signin method: It can either return a promise or execute a callback function.
  // You can prefer to keep this in userServices.js
  const signin = (username, password) => {
    console.log("SS:: PrivateRoute > useProviderAuth > signin() called...");
    return new Promise((resolve, reject) => {
      try {
        // do db call or API endpoint axios call here and return the promise.
        getUserDetails(username, password)
          .then((res) => {
            console.log("useProvideAuth > signin > getUserDetails > res=", res);
            setUser(res);
            localStorage.setItem("user", JSON.stringify(res));
            resolve(res);
          })
          .catch((err) => {
            debugger;
            console.log("useProvideAuth > signin > getUserDetails > err=", err);
            setUser([]);
            reject(err);
          });
      } catch (error) {
        console.error("signin error!==", error);
        reject("signin error!");
      }
    });
  };
  const getUser = () => {
    return localStorage.getItem("user");
    };

    const signOut = () => {
      setUser(null);
      localStorage.removeItem("user");
    };
  return {
    user,
    signin,
    signOut,
    getUser,
  };
}
