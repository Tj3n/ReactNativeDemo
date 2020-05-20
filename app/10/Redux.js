console.log('~~~~ redux with async');

class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  dispatch = action => {
    if (typeof action === 'function') {
      //if type is function then run it then run next action upon complete
      action(this.dispatch);
    } else {
      //if type is text then find and run normally
      console.log('received action:', action.type);
      this.state = this.reducer(this.state, action); //Update run through reducer to return state
    }
  };
}

//mainReducer2 - enhanced
const contactReducer = (state, action) => {
  if (action.type === ADD_CONTACT) {
    return [...state, action.payload];
  }

  return state;
};
const userReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {...state, ...action.payload};
    case ADD_CONTACT:
      return {...state, ...{prevContact: action.payload}};
    case LOG_IN_SUCCESS:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

const mainReducer = (state, action) => ({
  user: userReducer(state.user, action),
  contacts: contactReducer(state.contacts, action),
});

//action type key
const UPDATE_USER = 'UPDATE_USER';
const ADD_CONTACT = 'ADD_CONTACT';
const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';

//Create wrapper for dispatch action
const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
});

const addContact = update => ({
  type: ADD_CONTACT,
  payload: update,
});

const logInUser = (username, password) => dispatch => {
  dispatch({type: 'LOG_IN_SENT'});
  login(username, password)
    .then(token => {
      dispatch({type: LOG_IN_SUCCESS, payload: token});
    })
    .catch(() => {
      dispatch({type: 'LOG_IN_ERROR'});
    });
};

const login = async (username, password) => {
  const response = await fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({email: username, password: password}),
  });
  const json = await response.json();
  // console.log(json);
  if (!response.ok) {
    throw Error(json['error']);
  }
  return json;
};

const defaultState = {user: {}, contacts: []};
const store = new Store(mainReducer, defaultState);
store.dispatch(logInUser('eve.holt@reqres.in', 'cityslicka'));
/*
store.dispatch(logInUser())
store.dispatch(updateUser({bar: 'foz'}));
store.dispatch(updateUser({foo: 'foo'}));
store.dispatch(updateUser({bar: 'bar'}));
store.dispatch(addContact({name: 'a name', phone: 123456789}))
store.dispatch(addContact({name: 'b name', phone: 123456789}))
*/
console.log(store.getState());
setTimeout(() => {
  console.log(store.getState());
}, 2000); //time out coz async function