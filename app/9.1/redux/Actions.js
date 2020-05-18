//Action types
export const UPDATE_USER = 'UPDATE_USER';
export const ADD_CONTACT = 'ADD_CONTACT';

//Action types
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
});

export const addContact = update => ({
  type: ADD_CONTACT,
  payload: update,
});
