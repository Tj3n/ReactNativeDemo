import React from 'react';
import {TextInput, Button, View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';

export default class ContactAddForm extends React.Component {
  static propsType = {
    onSubmit: PropTypes.func,
  };

  state = {
    name: '',
    phone: ''
  };

  handleNameChange = name => {
    this.setState({name})
  };

  handlePhoneChange = phone => {
    this.setState({phone})
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state)
  }

  validateForm = () => {
    if (+this.state.phone >= 0 && this.state.phone.length === 10 && this.state.name.length >= 3) {
      this.setState({isValid: true})
    }
    this.setState({isValid: false})
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.name}
          placeholder="name"
          onChangeText={this.handleNameChange}
        />
        <TextInput
          style={styles.input}
          value={this.state.phone}
          placeholder="phone"
          onChangeText={this.handlePhoneChange}
          keyboardType='phone-pad'
        />
        <Button title="Submit" onPress={this.handleSubmit} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 16,
    justifyContent: 'center'
  }, 
  input: {
    minWidth: 100,
    borderColor: 'black',
    borderWidth: 1,
    padding: 8, //Inset
    marginTop: 8,
    marginHorizontal: 8,
    borderRadius: 2,
  },
});
