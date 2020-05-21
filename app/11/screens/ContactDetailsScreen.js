import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {} from 'react-navigation';
import ContactContext from '../ContactContext';

export class ContactDetailsScreen extends Component {
  static navigationOptions = ({route, navigation}) => ({
    title: route.params.contact.name,
  });

  goToRandom = () => {
    const contacts = this.context.contacts;
    const phone = this.props.route.params.contact.phone;
    let randomContact;
    while (!randomContact) {
      const randomIndex = Math.floor(Math.random() * contacts.length);
      if (contacts[randomIndex].phone !== phone) {
        randomContact = contacts[randomIndex];
      }
    }
    this.props.navigation.push('ContactDetail', {
      contact: randomContact,
    });
  };

  render() {
    return (
      <View>
        <Text> {this.props.route.params.contact.phone} </Text>
        <Button title="Go to random contact" onPress={this.goToRandom} />
      </View>
    );
  }
}

ContactDetailsScreen.contextType = ContactContext;

export default ContactDetailsScreen;
