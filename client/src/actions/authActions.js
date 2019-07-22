import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../helpers/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register a user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/auth/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login and get token
export const loginUser = userData => dispatch => {
  axios
    .post('/auth/login', userData)
    .then(res => {
      // Save token to lcocal storage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user dataz
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set the logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log User Out
export const logoutUser = () => dispatch => {
  // Remove item from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header -- Call the same function as you did to set it but set it to false this time instead of passing in a token
  setAuthToken(false);
  // Set the 'Current User' to a empty object || that will also set 'isAuthenticated' to false. This will now deny access to protected routes
  dispatch(setCurrentUser({}));
};
