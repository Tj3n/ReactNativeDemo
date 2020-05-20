import React, {Component} from 'react';
import {SectionList, Text, RefreshControl} from 'react-native';
import PropTypes from 'prop-types';
import Row from './ContactsRow';

const renderSectionHeader = obj => <Text>{obj.section.title}</Text>;

const ContactList = props => {
  //Reduce array into dictionary of contacts with key = first letter
  const contactByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    };
  }, {});

  const renderItem = ({item}) => <Row {...item} onSelectContact={props.onSelectContact}/>; 

  //Map into section data
  const sections = Object.keys(contactByLetter)
    .sort()
    .map(letter => ({
      title: letter,
      data: contactByLetter[letter],
    }));

  return (
    <SectionList
      keyExtractor={item => item.phone}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={sections}
      refreshControl={
        <RefreshControl refreshing={props.isRefreshing} onRefresh={props.onRefresh} />
      }
    />
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  onRefresh: PropTypes.func,
  isRefreshing: PropTypes.bool,
};

export default ContactList;
