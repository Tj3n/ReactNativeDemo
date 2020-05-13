import React, {Component} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  SectionList,
  ScrollViewBase,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ContactAddScreen from './screens/ContactAddScreen';
import ContactListScreen from './screens/ContactListScreen';
import ContactDetailsScreen from './screens/ContactDetailsScreen';
import ContactContext from './ContactContext';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

console.log('~~~~ Navigation example');

//Contacts
const contacts = [
  {name: 'ddf e', phone: '4567', key: 2},
  {name: 'eef f', phone: '7890', key: 3},
  {name: 'aac b', phone: '1234', key: 0},
  {name: 'bbh c', phone: '4321', key: 1},
];

const compareNames = (lhs, rhs) => lhs.name.localeCompare(rhs.name);
let key = 4;

//Switch Navigator
const SwitchNavigator = createSwitchNavigator(
  {
    AddContact: ContactAddScreen,
    ListContact: ContactListScreen,
  },
  {
    initialRouteName: 'ListContact',
  },
);
const AppContainer = createAppContainer(SwitchNavigator);

//Stack Navigator
const MainStackNavigator = createStackNavigator();

//Tab NAvigator
const TabNavigator = createBottomTabNavigator();

//App
class ContactApp extends Component {
  state = {
    showContacts: true,
    contacts: contacts,
    isLoggedIn: false,
  };

  addContact = newContact => {
    this.setState(prevState => ({
      showContacts: true,
      contacts: [...prevState.contacts, {...newContact, key: key++}],
    })); //Create new array with added the newContact
  };

  onLoggedIn = () => {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn,
    }));
  };

  //Render with Sections
  render() {
    return (
      // With Switch
      // <AppContainer screenProps={{contacts: this.state.contacts, addContact: this.addContact}} />

      // Witch Stack
      <ContactContext.Provider
        value={{contacts: this.state.contacts, addContact: this.addContact}}>
        <MainStackNavigator.Navigator
          screenOptions={{headerShown: true}}
          initialRouteName="ListContact">
          {this.state.isLoggedIn ? (
            <>
              <MainStackNavigator.Screen
                name="ListContact"
                component={ContactListScreen}
                options={ContactListScreen.navigationOptions}
              />
              <MainStackNavigator.Screen
                name="AddContact"
                component={ContactAddScreen}
                options={options => ({
                  headerTitle: 'Add Contact',
                  headerTintColor: '#a41034',
                })}
              />
              <MainStackNavigator.Screen
                name="ContactDetail"
                component={ContactDetailsScreen}
                options={ContactDetailsScreen.navigationOptions}
              />
            </>
          ) : (
            <MainStackNavigator.Screen
              name="Login"
              component={LoginScreen}
              initialParams={{onLoggedIn: this.onLoggedIn}}
            />
          )}
        </MainStackNavigator.Navigator>
      </ContactContext.Provider>
    );
  }
}

class TabbedApp extends Component {
  render() {
    return (
      <NavigationContainer>
        <TabNavigator.Navigator tabBarOptions={{activeTintColor: '#a41034'}}>
          <TabNavigator.Screen
            name="ContactApp"
            component={ContactApp}
            options={options => ({
              tabBarIcon: ({focused, color}) => (
                <Ionicons name={`ios-contacts`} size={25} color={color} />
              ),
            })}
          />
          <TabNavigator.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={options => ({
              tabBarIcon: ({focused, color}) => (
                <Ionicons name={`ios-options`} size={25} color={color} />
              ),
            })}
          />
        </TabNavigator.Navigator>
      </NavigationContainer>
    );
  }
}

export default TabbedApp;
