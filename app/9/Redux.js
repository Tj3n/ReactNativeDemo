console.log('~~~~ reducer');

const reducer = (state, update) => ({
  ...state,
  ...update,
}); //merge object, take all values from both and return new object with values

let state = {};
state = reducer(state, {foo: 'foo'});
console.log(state);
state = reducer(state, {bar: 'bar'});
console.log(state);
state = reducer(state, {foo: 'baz'});
console.log(state);

console.log('~~~~ reducer with class');

class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  dispatch(update) {
    this.state = this.reducer(this.state, update); //Update run through reducer to return state
  }
}

let store = new Store(reducer, {foo: 'foo'});
console.log(store.getState());
store.dispatch({bar: 'bar'}); //Passing update function via dispatch
console.log(store.getState());
store.dispatch({foo: 'baz'});
console.log(store.getState());

console.log('~~~~ combined reducer');

//mainReducer
const contactReducer = (state, newContact) => [...state, newContact];
const userReducer = (state, update) => ({
  ...state,
  ...update,
});

const mainReducer = (state, action) => {
  if (action.type === UPDATE_USER) {
    return {
      ...state,
      user: userReducer(state.user, action.payload),
    };
  }

  if (action.type === ADD_CONTACT) {
    return {
      ...state,
      contacts: contactReducer(state.contacts, action.payload),
    };
  }

  return state;
};

//mainReducer2 - enhanced
const contactReducer2 = (state, action) => {
  if (action.type === ADD_CONTACT) {
    return [...state, action.payload];
  }

  return state;
};
const userReducer2 = (state, action) => {
  if (action.type === UPDATE_USER) {
    return {
      ...state,
      ...action.payload,
    };
  }

  if (action.type === ADD_CONTACT) { //Can also react to multiple action type
    return {...state, ...{prevContact: action.payload}};
  }

  return state;
};
const mainReducer2 = (state, action) => ({
  user: userReducer2(state.user, action),
  contacts: contactReducer2(state.contacts, action),
});

//action type key
const UPDATE_USER = 'UPDATE_USER';
const ADD_CONTACT = 'ADD_CONTACT';

const defaultState = {user: {}, contacts: []};
store = new Store(mainReducer2, defaultState);

//Dispatch action -> reducer -> update -> new state
store.dispatch({type: UPDATE_USER, payload: {foo: 'foo'}});
console.log(store.getState());
store.dispatch({type: UPDATE_USER, payload: {bar: 'bar'}}); //Passing update function via dispatch
console.log(store.getState());
store.dispatch({type: UPDATE_USER, payload: {foo: 'baz'}});
console.log(store.getState());
store.dispatch({
  type: ADD_CONTACT,
  payload: {name: 'a name', phone: 123456789},
});
store.dispatch({
  type: ADD_CONTACT,
  payload: {name: 'b name', phone: 123456789},
});
console.log(store.getState());

//Create wrapper for dispatch action
const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
});
store.dispatch(updateUser({bar: 'foz'}));
console.log(store.getState());
