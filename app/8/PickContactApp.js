import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {Asset, Constants, Permissions} from 'react-native-unimodules';
import * as Contacts from 'expo-contacts';

export default class PickContactApp extends React.Component {
  state = {
    contact: null
  };

  getRandomContactAsync = async () => {
    // let {status} = await Permissions.getAsync(Permissions.CONTACTS);
    let {status} = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission not granted');
    }

    let contacts = await Contacts.getContactsAsync({
      pageSize: 1,
      pageOffset: 0,
      fields: [Contacts.PHONE_NUMBERS],
    });
    console.log(contacts);
    this.setState({contact: contacts.data[0]})
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Pick a random contact" onPress={this.getRandomContactAsync} />
        {(this.state.contact && (<Text style={styles.paragraph}>{this.state.contact.name}</Text>) || null)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
