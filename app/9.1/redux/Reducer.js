import {combineReducers} from 'redux';
import {UPDATE_USER, ADD_CONTACT} from './Actions';

const DEFAULT_STATE = {user: {}, contacts: []};

const contactReducer = (state = [], action) => {
  if (action.type === ADD_CONTACT) {
    return [...state, action.payload];
  }

  return state;
};

//Default state = empty object
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {...state, ...action.payload};
    case ADD_CONTACT:
      return {...state, ...{prevContact: action.payload}};
    default:
      return state;
  }
};

const reducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
});

export default reducer;
