import * as actionTypes from './actionTypes';
import firebase from '../../firebase';

export const signInSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SIGNIN_SUCCESS,
    payload: {data}
  }
};

export const signInError = (errorCode) => {
  return {
    type: actionTypes.AUTH_SIGNIN_ERROR,
    payload: {errorCode}
  }
};

export const signIn = (email, password) => {
  return dispatch => {
    dispatch(signInStart());
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result=>dispatch(signInSuccess(result)))
      .catch(error=>dispatch(signInError(error.code)));
  };
};

export const logoutStart = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const logoutSuccess = (data) => {
  return {
    type: actionTypes.AUTH_LOGOUT_SUCCESS,
    payload: {data}
  }
};

export const logoutError = (error) => {
  return {
    type: actionTypes.AUTH_LOGOUT_ERROR,
    payload: {error}
  }
};

export const logout = () => {
  return dispatch => {
    dispatch(logoutStart());
    firebase.auth().signOut()
      .then(result=>{
        dispatch(logoutSuccess(result));
        dispatch(reset());
      })
      .catch(error=>dispatch(logoutError(error)));
  };
};

export const signInStart = () => {
  return {
    type: actionTypes.AUTH_SIGNIN
  }
};

export const reset = () => {
  return {
    type: actionTypes.RESET
  }
}