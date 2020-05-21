//@flow
import {combineReducers} from 'redux'
import contacts from '../contacts'
import {UPDATE_USER, ADD_CONTACT, LOG_IN_SUCCESS, LOG_IN_ERROR, CHANGE_CONTACT} from './Actions'

const contactReducer = (state = contacts, action) => {
   if (action.type === ADD_CONTACT) {
      return [...state, action.payload] //Merged 2 array
   }
   if (action.type === CHANGE_CONTACT) {
      const [firstContact, ...rest] = state //state is the contacts array, extract first contact and the rest
      if (!firstContact) return state
      const randomName = Math.random()
         .toString(36)
         .replace(/[^a-z]+/g, '')
         .substr(0, 5)
      const newContact = {...firstContact, name: randomName} //clone firstContact and override name var
      return [newContact, ...rest] //return new array with newContact and the rest
   }

   return state
}

//Default state = empty object
const userReducer = (state = {}, action) => {
   switch (action.type) {
      case UPDATE_USER:
         return {...state, ...action.payload}
      case ADD_CONTACT:
         return {...state, ...{prevContact: action.payload}}
      case LOG_IN_SUCCESS:
         return {...state, ...{token: action.payload}}
      case LOG_IN_ERROR:
         return {...state, ...{loginErr: action.payload}}
      default:
         return state
   }
}

const reducer = combineReducers({
   user: userReducer,
   contacts: contactReducer,
})

export default reducer
