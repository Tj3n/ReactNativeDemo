import React, {Component} from 'react';
import {View, Button, StyleSheet, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ContactList from '../comps/ContactList';
import ContactContext from '../ContactContext';

export default class ContactListScreen extends Component {
  static navigationOptions = ({route, navigation}) => ({
    title: 'Contacts',
    headerTintColor: '#a41034',
    headerRight: () => (
      <Button
        title="Add"
        color="#a41034"
        onPress={() => {
          navigation.navigate('AddContact');
        }}
      />
    ),
  });

  state = {
    showContacts: true,
    isRefreshing: false,
  };

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}));
  };

  showForm = () => {
    this.props.navigation.navigate('AddContact');
  };

  refreshContacts = () => {
    this.setState({isRefreshing: true});
    this.context
      .refreshContacts()
      .then(() => this.setState({isRefreshing: false}));
  };

  //Render with Sections
  render() {
    const values = this.context;
    return (
      <View style={styles.container}>
        <Button title="Toggle Contacts" onPress={this.toggleContacts} />
        {/* <Button title="Add Contact" onPress={this.showForm} /> */}
        {this.state.showContacts && ( //If showContacts then return scrollView
          // <ContactList contacts={this.props.screenProps.contacts} /> //For Switch navigator
          <ContactList
            contacts={values.contacts}
            onSelectContact={contact => {
              this.props.navigation.navigate('ContactDetail', {
                contact: contact,
              });
            }}
            onRefresh={this.refreshContacts}
            isRefreshing={this.state.isRefreshing}
          />
        )}
      </View>
    );
  }
}

ContactListScreen.contextType = ContactContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: getStatusBarHeight(),
  },
});
