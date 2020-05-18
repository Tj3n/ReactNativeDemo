import React, {Component} from 'react';
import {View, Button, StyleSheet, StatusBar} from 'react-native';
import {connect} from 'react-redux'

import ContactAddForm from '../comps/ContactAddForm';
import ContactContext from '../ContactContext'
import store from '../redux/Store'
import { addContact } from '../redux/Actions'

class ContactAddScreen extends Component {
  handleSubmit = formState => {
    // this.props.screenProps.addContact(formState); //Switch can use screenProps
    // this.context.addContact(formState) //Use Context for Stack
    // store.dispatch(addContact({name: formState.name, phone: formState.phone})) //Using Redux, use below if with react redux
    this.props.addContact({name: formState.name, phone: formState.phone})

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

export default connect(null, {addContact: addContact})(ContactAddScreen)