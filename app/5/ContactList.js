import React, {Component} from 'react';
import {SectionList, Text} from 'react-native';
import PropTypes from 'prop-types';
import Row from './ContactsRow';

const renderItem = ({item}) => <Row {...item} />;
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

  //Map into section data
  const sections = Object.keys(contactByLetter)
    .sort()
    .map(letter => ({
      title: letter,
      data: contactByLetter[letter],
    }));

  return (
    <SectionList
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={sections}
    />
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
};

export default ContactList;
