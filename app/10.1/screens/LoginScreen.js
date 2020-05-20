import React from 'react';
import {Button, View, StyleSheet, Text, Keyboard} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {logInUser} from '../redux/Actions';
import {login} from '../ContactApi';
import ContactContext from '../ContactContext';

class LoginScreen extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    token: PropTypes.string,
    logInUser: PropTypes.func,
  };

  state = {
    username: 'eve.holt@reqres.in',
    password: 'cityslicka',
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.route.params.onLoggedIn();
    }
  }

  handleUsername = username => {
    this.setState({username});
  };

  hanlePassword = password => {
    this.setState({password});
  };

  _login = () => {
    Keyboard.dismiss();
    this.props.logInUser(this.state.username, this.state.password);

    // login(this.state.username, this.state.password)
    //   .then(results => this.props.route.params.onLoggedIn())
    //   .catch(error => console.warn(error));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{'You are currently logged out.'}</Text>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={this.state.username}
          onChangeText={this.handleUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={this.state.password}
          onChangeText={this.hanlePassword}
          secureTextEntry={true}
        />
        <Button title="Press to Log In" onPress={this._login} />
      </View>
    );
  }
}

LoginScreen.contextType = ContactContext;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
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

const mapStateToProps = state => ({
  error: state.user.loginErr,
  token: state.user.token,
});
export default connect(
  mapStateToProps,
  {logInUser},
)(LoginScreen);
