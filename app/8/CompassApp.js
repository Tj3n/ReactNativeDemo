import * as React from 'react';
import {Text, View, StyleSheet, Button, Image} from 'react-native';
import {Asset, Constants, Permissions} from 'react-native-unimodules';
import { Magnetometer, DeviceMotion } from 'expo-sensors';

export default class CompassApp extends React.Component {
  state = {
    isReady: false,
    theta: '0rad',
    angle: '0'
  };

  componentDidMount() {
    // this.setupCompass();
    this.setupDeviceMotion();
  }

  componentWillUnmount() {
    Magnetometer.removeAllListeners()
    DeviceMotion.removeAllListeners()
  }

  setupCompass = async () => {
    Magnetometer.setUpdateInterval(10000);
    Magnetometer.addListener(v => {
      // console.log(this.calculateTheta(v));
      this.setState({theta: this.calculateTheta(v)});
    });
  };

  calculateTheta(v) {
    let theta = '0rad';
    if (v) {
      let {x, y, z} = v;
      theta = Math.atan(-x / y);
      if (-x > 0 && y > 0) {
      } else if (y > 0) {
        theta += Math.PI;
      } else {
        theta += Math.PI * 2;
      }
    }
    return theta;
  }

  setupDeviceMotion = async () => {
    DeviceMotion.setUpdateInterval(1000)
    DeviceMotion.addListener(dm => {
      if (dm && dm.rotation) {
        // console.log(dm.rotation.gamma);
        this.setState({angle: dm.rotation.gamma})
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.angle}</Text>
        <Image
          source={require('./Res/compass-needle.png')}
          style={{
            height: 320,
            width: 320,
            // transform: [{rotate: `${this.state.theta}rad`}],
            transform:[{rotate: `${this.state.angle}rad`}]
          }}
          resizeMode="center"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
