import React, {Component} from 'react';
import {View, Button, StyleSheet, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ContactList from '../comps/ContactList';
import ContactContext from '../ContactContext';
// import store from '../redux/Store'
import {connect} from 'react-redux'; // replace the above import

class ContactListScreen extends Component {
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
    // this.setState({isRefreshing: true});
    // this.context
    //   .refreshContacts()
    //   .then(() => this.setState({isRefreshing: false}));
  };

  handleSelectContact = (contact) => {
    this.props.navigation.navigate('ContactDetail', {
      contact: contact,
    });
  }

  //Render with Sections
  render() {
    // const contacts = this.context.contacts; //Context
    // const contacts = store.getState().contacts; //Redux, don't need if use the mapStateToProps+connect
    return (
      <View style={styles.container}>
        <Button title="Toggle Contacts" onPress={this.toggleContacts} />
        {/* <Button title="Add Contact" onPress={this.showForm} /> */}
        {this.state.showContacts && ( //If showContacts then return scrollView
          <ContactList
            contacts={this.props.contacts}
            onSelectContact={this.handleSelectContact}
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

//Extract only contacts props from whole app state
const mapStateToProps = state => ({
  contacts: state.contacts,
})
export default connect(mapStateToProps)(ContactListScreen);
