// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GET_DASHBOARD_DATA, } from "./CONSTANTS";

/**
 * Function to fetch all the users.
 */

export const getDashboardData = (token) => {
 
  return new Promise((resolve, reject) => {
    try {

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      axios
        .get(GET_DASHBOARD_DATA(), config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject("Error in getDashboardData axios!");
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};
