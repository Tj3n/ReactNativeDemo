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
import {fetchUsers} from './ContactApi'

console.log('~~~~ API example');

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
    contacts: null,
    isLoggedIn: false,
  };

  componentDidMount() {
    // fetchUsers().then(results => this.setState({contacts: results}))
    // Or
    this.getUsers()
  }

  getUsers = async () => {
    const results = await fetchUsers()
    this.setState({contacts: results})
    return results
  }

  addContact = newContact => {
    this.setState(prevState => ({
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
        value={{contacts: this.state.contacts, addContact: this.addContact, refreshContacts: this.getUsers}}>
        <MainStackNavigator.Navigator
          screenOptions={{
            headerShown: true,
            gestureEnabled: this.state.isLoggedIn,
          }}
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
