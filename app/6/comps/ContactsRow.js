import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//stateless component
const Row = props => (
  <TouchableOpacity
    style={styles.row}
    onPress={() => {
      props.onSelectContact(props);
    }}>
    <Text>{props.name}</Text>
    <Text>{props.phone}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    padding: 20,
  },
});

export default Row;
