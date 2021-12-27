// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import {  GET_USER_DETAILS } from "./CONSTANTS";


/**
 * Function to fetch the details of the user based on userId.
 * @param {string} userid of the user.
 * early dev example passing Skeleton(static object) as API response.
 */
export const getUserDetails = (username, password) => {
  console.log("userServices > getUserDetails called...");
  return new Promise((resolve, reject) => {
    try {
      axios
      .post(GET_USER_DETAILS(),{
        "Username":username,
        "Password":password
    })
      .then((res) => {
        console.log("getUserDetails > axios res=", res);
        resolve(res.data);
      })
      .catch((err) => {
        console.log("getUserDetails > axios err=", err);
        reject(err.response.data.message);
      });
    } catch (error) {
      console.error("in userServices > getUserDetails, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

