import React, {Component} from 'react';

import EmojiDict from './app/3/Emoji';
import {} from './app/1/ObjectMutation.js';
import {} from './app/1/Object.js';
import {} from './app/1/Function.js';
import {} from './app/2/Async.js';
import {} from './app/1/Class.js';
import TodoScreen from './app/3/TodoStyling.js';
import WorkTimer from './app/4.1/WorkTimer.js';
import Contacts from './app/4.2/Contacts';
import ContactsValidated from './app/5/Contacts';
import ContactsNavigation from './app/6/ContactApp';
import AppNavigator from './app/6.1/NavigationExample';
import ContactsViaAPI from './app/7/ContactApp';
import MapApp from './app/8/MapApp';
import PickContactApp from './app/8/PickContactApp';
import CompassApp from './app/8/CompassApp';
import VideoApp from './app/8/VideoApp';
import PhotoEditorApp from './app/8/PhotoEditorApp';
// import {} from './app/9/Redux.js'; //Name conflict
import ContactRedux from './app/9.1/ContactApp';
import {} from './app/10/Redux.js';
import ContactReduxAsync from './app/10.1/ContactApp'

import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {Button, StyleSheet} from 'react-native';

import {Constants, Asset} from 'react-native-unimodules';

Icon.loadFont();
Ionicons.loadFont();

const screens = [
  {
    name: 'TodoScreen',
    comp: <TodoScreen />,
  },
  {
    name: 'WorkTimer',
    comp: <WorkTimer />,
  },
  {
    name: 'Contacts',
    comp: <Contacts />,
  },
  {
    name: 'ContactsValidated',
    comp: <ContactsValidated />,
  },
  {
    name: 'ContactsNavigation',
    comp: <ContactsNavigation />,
  },
  {
    name: 'AppNavigator',
    comp: <AppNavigator />,
  },
  {
    name: 'ContactsViaAPI',
    comp: <ContactsViaAPI />,
  },
  {
    name: 'MapApp',
    comp: <MapApp />,
  },
  {
    name: 'PickContactApp',
    comp: <PickContactApp />,
  },
  {
    name: 'CompassApp',
    comp: <CompassApp />,
  },
  {
    name: 'VideoApp',
    comp: <VideoApp />,
  },
  {
    name: 'PhotoEditorApp',
    comp: <PhotoEditorApp />,
  },
  {
    name: 'ContactRedux',
    comp: <ContactRedux />,
  },
  {
    name: 'ContactReduxAsync',
    comp: <ContactReduxAsync />,
  },
];

export default class App extends Component {
  state = {
    currentScreen: null,
  };

  render() {
    return (
      this.state.currentScreen || (
        <ScrollView style={styles.container}>
          {screens.map(screen => (
            <Button
              key={screen.name}
              title={screen.name}
              onPress={() => this.setState({currentScreen: screen.comp})}
            />
          ))}
        </ScrollView>
      )
    );

    // return <TodoScreen />;
    // return <WorkTimer />;
    // return <ContactsNavigation />;
    // return <AppNavigator />;
    // return <ContactsNavigation />;
    // return <ContactsViaAPI />;
    // return <MapApp />
    // return <PickContactApp />
    // return <CompassApp />
    // return <VideoApp />
    // return <PhotoEditorApp />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
