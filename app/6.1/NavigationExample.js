import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

class ScreenComponentOne extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'teal',
        }}>
        <Button
          title="Go to Screen 2"
          onPress={() => this.props.navigation.navigate('Two')}
        />
      </View>
    );
  }
}

class ScreenComponentTwo extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'orange',
        }}>
        <Button
          title="Go to Screen 3"
          onPress={() =>
            this.props.navigation.navigate('Three', {number: 1234})
          }
        />
      </View>
    );
  }
}

class ScreenComponentThree extends React.Component {
  static navigationOptions = ({route}) => ({
    title: `Num: ${route.params.number}`,
    headerTintColor: 'purple',
  });

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'purple',
        }}>
        <Text>{this.props.route.params.number}</Text>
        <Button
          title="New number"
          onPress={() => {
            this.props.navigation.setParams({number: 4321});
          }}
        />
        <Button
          title="Go back"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}

//Single switch
const Switch = createSwitchNavigator({
  One: ScreenComponentOne,
  Two: ScreenComponentTwo,
  Three: ScreenComponentThree,
});
const AppContainer = createAppContainer(Switch);
function AppNavigatorSwitch() {
  return <AppContainer />;
}

//Navigation bar
const Stack = createStackNavigator();
function AppNavigatorStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="One"
          component={ScreenComponentOne}
          options={{headerTintColor: 'teal'}}
        />
        <Stack.Screen
          name="Two"
          component={ScreenComponentTwo}
          options={ ({route, navigation}) => ({
            headerTitle: () => <Button title="Btn title" onPress={() => alert('Pressed')} ></Button>,
            headerTintColor: 'orange',
            headerRight: () => <Button title="Press me" onPress={() => navigation.navigate('Three', {number: 1423})}/>
          })}
        />
        <Stack.Screen
          name="Three"
          component={ScreenComponentThree}
          options={ScreenComponentThree.navigationOptions} //Can use static in class
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigatorStack;
// export default AppNavigatorSwitch;
