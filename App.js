import React, { Component } from 'react';

import EmojiDict from './app/Emoji';
import {  } from './app/1/ObjectMutation.js';
import {  } from './app/1/Object.js';
import {  } from './app/1/Function.js';
import {  } from './app/2/Async.js';
import {  } from './app/1/Class.js';
import TodoScreen from './app/3/TodoStyling.js'
import WorkTimer from './app/4.1/WorkTimer.js'
import Contacts from './app/4.2/Contacts'
import ContactsValidated from './app/5/Contacts'
import ContactsNavigation from './app/6/ContactApp'
import AppNavigator from './app/6.1/NavigationExample'

import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';

Icon.loadFont();
Ionicons.loadFont();

export default class App extends Component {
	render() {
		// return <TodoScreen />;
		// return <WorkTimer />;
		// return <ContactsNavigation />;
		// return <AppNavigator />;
		return <ContactsNavigation />;
	}
}