import {login} from '../ContactApi';

//Action types
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_CONTACT = 'ADD_CONTACT';
export const LOG_IN_SENT = 'LOG_IN_SENT';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';

//Action types
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
});

export const addContact = update => ({
  type: ADD_CONTACT,
  payload: update,
});

export const logInUser = (username, password) => dispatch => {
  dispatch({type: LOG_IN_SENT});

  login(username, password)
    .then(token => {
      dispatch({type: LOG_IN_SUCCESS, payload: token});
    })
    .catch(error => {
      dispatch({type: LOG_IN_ERROR, payload: error.message});
    });
};
