import { createStore } from 'redux'
import reducer from './Reducer'
import { addContact } from './Actions'

const store = createStore(reducer)

/*
//Dispatch action -> reducer -> update -> new state
store.dispatch(updateUser({foo: 'foo'}));
store.dispatch(updateUser({bar: 'bar'}));
store.dispatch(updateUser({foo: 'baz'}));
console.log(store.getState());
*/

store.dispatch(addContact({name: 'a name', phone: '1234567890'}))
store.dispatch(addContact({name: 'b name', phone: '9876543210'}))

export default store;