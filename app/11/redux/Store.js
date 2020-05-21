import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer, purgeStoredState} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import reducer from './Reducer';
import {addContact} from './Actions';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

/*
const thunk = store => next => action => {
   if (typeof action === 'function') {
      action(store.dispatch)
   } else  {
      next(action)
   }
}
*/

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

// persistor.purge();

// export default () => {
//   let store = createStore(persistedReducer, applyMiddleware(thunk));
//   let persistor = persistStore(store);
//   return {store, persistor};
// };

/*
//Dispatch action -> reducer -> update -> new state
store.dispatch(updateUser({foo: 'foo'}));
store.dispatch(updateUser({bar: 'bar'}));
store.dispatch(updateUser({foo: 'baz'}));
console.log(store.getState());

export default store;

*/
