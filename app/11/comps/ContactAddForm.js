import React from 'react';
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ContactAddForm extends React.Component {
  static propsType = {
    onSubmit: PropTypes.func,
  };

  state = {
    name: '',
    phone: '',
    isValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.name !== prevState.name ||
      this.state.phone !== prevState.phone
    ) {
      //Avoid inf loop
      this.validateForm();
    }
  }

  handleNameChange = name => {
    this.setState({name}); //Use componentDidUpdate or use callback
    // this.setState({name}, this.validateForm);
  };

  handlePhoneChange = phone => {
    if (+phone >= 0 && phone.length <= 10) {
      //cast to a number
      this.setState({phone});
      // this.setState({phone}, this.validateForm); //this.validateForm is callback after setState to setState again for enable button
    }
  };

  //Generic handle, not performance
  // getHandler = key => {
  //   return val => { // return a function
  //     //cast key to string and use as key
  //     // val => {this.setState({name: val})} if key === name
  //     this.setState({[key]: val})
  //   }
  // }

  // // handleNameChange = getHandler('name') //Or use it in the render form
  // handlePhoneChange = this.getHandler('phone')

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  validateForm = () => {
    const names = this.state.name.split(' ');
    if (
      +this.state.phone >= 0 &&
      this.state.phone.length === 10 &&
      names.length >= 2 &&
      !names.includes('')
    ) {
      this.setState({isValid: true});
    } else {
      this.setState({isValid: false});
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.name}
          placeholder="name"
          onChangeText={this.handleNameChange}
        />
        {/* <TextInput
          style={styles.input}
          value={this.state.name}
          placeholder="name"
          onChangeText={this.getHandler('name')}
        /> */}
        <TextInput
          style={styles.input}
          value={this.state.phone}
          placeholder="phone"
          onChangeText={this.handlePhoneChange}
          keyboardType="phone-pad"
        />
        <Button
          title="Submit"
          onPress={this.handleSubmit}
          disabled={!this.state.isValid}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 16,
    justifyContent: 'center',
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
