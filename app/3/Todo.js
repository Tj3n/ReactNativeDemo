import React, {Component} from 'react';
import {View, Button, Text, ScrollView} from 'react-native';

//For web only, use https://codesandbox.io/
const Todo = props => (
  <View>
    {/* <input
      type="checkbox"
      checked={props.todo.checked}
      onChange={props.onChecked}
    /> */}
    <Button onPress={props.onDelete} title="delete" />
    <Text>{props.todo.text}</Text>
  </View>
);

let id = 0;

export default class TodoScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  addTodo() {
    id++;
    const text = `TODO number ${id}`;
    this.setState({
      todos: [...this.state.todos, {id: id, text: text, isChecked: false}],
    });
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
    });
  }

  toggle(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          id: todo.id,
          text: todo.text,
          isChecked: !todo.isChecked,
        };
      }),
    });
  }

  render() {
    return (
      <View>
        <Text>Todo count: {this.state.todos.length}</Text>
        <Text>
          Unchecked count:{' '}
          {this.state.todos.filter(todo => !todo.isChecked).length}
        </Text>
        <Button onPress={() => this.addTodo()} title="Add todo" />
        <ScrollView>
          {this.state.todos.map(todo => (
            <Todo
              onChecked={() => this.toggle(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
