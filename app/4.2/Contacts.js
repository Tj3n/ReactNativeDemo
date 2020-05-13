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
  StatusBarIOS,
  ScrollViewBase,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Row from './ContactsRow';
import ContactList from './ContactList'
import ContactAddForm from './ContactAddForm'

console.log('~~~~ ScrollView and FlatList example');

const contacts = [
  {name: 'ddf e', phone: '4567', key: 2},
  {name: 'eef f', phone: '7890', key: 3},
  {name: 'aac b', phone: '1234', key: 0},
  {name: 'bbh c', phone: '4321', key: 1},
];

const compareNames = (lhs, rhs) => lhs.name.localeCompare(rhs.name);
let key = 4

export default class Contacts extends Component {
  state = {
    showContacts: true,
    contacts: contacts,
  };

  addContact = newContact => {
    this.setState(prevState => ({showContacts: true, contacts: [...prevState.contacts, {...newContact, key:key++}]})) //Create new array with added the newContact
  }

  toggleContacts = () => {
    this.setState(prevState => ({showContacts: !prevState.showContacts}));
  };

  sort = () => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts].sort(compareNames),
    })); //Create new array from old one then only sort
  };

  //   renderItem = obj => <Row name={obj.item.name} phone={obj.item.phone} />
  //   renderItem = obj => <Row {...obj.item} />
  //   renderItem = ({item}) => <Row {...item} />; //Item is the key for renderItem function for flatlist, read docs, basically same as tableView cellForRow

  //Render with FlatList, same as using TableView
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Button title="sort" onPress={this.sort} />
  //       <Button title="toggle contacts" onPress={this.toggleContacts} />
  //       {this.state.showContacts && ( //If showContacts then return scrollView
  //         <FlatList renderItem={this.renderItem} data={this.state.contacts} />
  //       )}
  //     </View>
  //   );
  // }

  //Render with Sections
  render() {
    return (
      <View style={styles.container}>
        <Button title="sort" onPress={this.sort} />
        <Button title="toggle contacts" onPress={this.toggleContacts} />
        <ContactAddForm onSubmit={this.addContact} />
        {this.state.showContacts && ( //If showContacts then return scrollView
          <ContactList contacts={this.state.contacts} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: getStatusBarHeight(),
  },
});
