import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Asset, Constants, Permissions} from 'react-native-unimodules';
import * as ImageManipulator from 'expo-image-manipulator';
import { Camera } from 'expo-camera';
import { TouchableHighlight } from 'react-native-gesture-handler';

console.log("~~~~~PhotoEditorApp");

class PhotoEditorApp extends Component {
  state = {
    selectedImg: null,
    customCameraReady: false,
  };

  launchCameraRoll = async () => {
    let {status} = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission not granted');
      return
    }

    let img = await ImagePicker.launchImageLibraryAsync();
    console.log(img);
    this.setState({selectedImg: img});
  };

  launchCamera = async () => {
    let {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission not granted');
      return
    }

    let img = await ImagePicker.launchCameraAsync({allowsEditing: true});
    console.log(img);
    let flippedImg = await ImageManipulator.manipulateAsync(img.uri, [
      {
        flip: ImageManipulator.FlipType.Horizontal,
      },
    ]);

    this.setState({selectedImg: flippedImg});
  };

  launchCustomCamera = async () => {
    let {status} = await Camera.getPermissionsAsync()
    if (status !== 'granted') {
      console.error('Permission not granted');
      return;
    }

    this.setState({customCameraReady: true})
  }

  capturePhoto = async () => {
    let img = await this.cameraRef.takePictureAsync()
    console.log(img);
    this.setState({ selectedImg: img })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> PhotoEditor </Text>
        <Button title={'Launch Image Picker'} onPress={this.launchCameraRoll} />
        <Button title={'Launch Camera'} onPress={this.launchCamera} />
        <Button title={'Launch Custom Camera'} onPress={this.launchCustomCamera} />
        {(this.state.customCameraReady && (
          <TouchableHighlight onPress={this.capturePhoto}>
            <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={val => {
              this.cameraRef = val;
            }}/>
          </TouchableHighlight>
        ) || null)}
        {this.state.selectedImg && (
          <Image
            style={{width: 200, height: 200}}
            source={{uri: this.state.selectedImg.uri}}
          />
        )}
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
  },
  camera: {
    width: 400,
    height: 400,
  }
});

export default PhotoEditorApp;
