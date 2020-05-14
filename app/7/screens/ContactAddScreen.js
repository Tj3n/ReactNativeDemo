import React, {Component} from 'react';
import {View, Button, StyleSheet, StatusBar} from 'react-native';
import ContactAddForm from '../comps/ContactAddForm';
import ContactContext from '../ContactContext'

export default class ContactAddScreen extends Component {
  handleSubmit = formState => {
    // this.props.screenProps.addContact(formState); //Switch can use screenProps
    this.context.addContact(formState) //Use Context for Stack
    this.props.navigation.navigate('ListContact');
  };

  render() {
    return (
      <View>
        <ContactAddForm onSubmit={this.handleSubmit} />
      </View>
    );
  }
}

ContactAddScreen.contextType = ContactContext
