import React, {PureComponent, Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//PureComponent compare props to re-render
// class Row extends PureComponent {

//More control with manual shouldComponentUpdate
class Row extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.name !== this.props.name;
  }

  render() {
    const props = this.props;
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          props.onSelectContact(props);
        }}>
        <Text>{props.name}</Text>
        <Text>{props.phone}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 20,
  },
});

export default Row;
