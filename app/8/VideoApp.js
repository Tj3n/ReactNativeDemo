import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import {Constants, Asset} from 'react-native-unimodules';
import {Video, Audio} from 'expo-av';
import * as Font from 'expo-font';
import {
  setAudioModeAsync,
  INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
} from 'expo-av/build/Audio';

console.log('~~~~ video, audio, font');

export default class VideoApp extends Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setupAll();
  }

  setupAll = async () => {
    await Promise.all([
      this.setAudioMode(),
      this.loadFont(),
      this.loadVideo(),
    ]) //wait multiple promise
    this.setState({isReady: true})
  };

  setAudioMode = async () => {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      shouldDuckAndroid: true,
      interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      interruptionModeIOS: INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
    });
  };

  loadFont = async () => {
    await Font.loadAsync({
      CopperBlackRegular: require('./Res/CooperBlackRegular.ttf'),
    });
  };

  videoSources = [
    require('./Res/1.mp4'),
    require('./Res/2.mp4'),
    require('./Res/3.mp4'),
    require('./Res/4.mp4'),
    require('./Res/5.mp4'),
    require('./Res/6.mp4'),
    require('./Res/7.mp4'),
    require('./Res/8.mp4'),
    require('./Res/9.mp4'),
  ];

  loadVideo = async () => {
    await Asset.loadAsync(this.videoSources);
  };

  renderItem = ({item}) => <CatVideoButton style={styles.itemContainer} source={item} size={size} /> ;

  render() {
    if (!this.state.isReady) {
      return <ActivityIndicator style={styles.container} animating={true} />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}> Cat </Text>
        <FlatList
          data={this.videoSources}
          renderItem={this.renderItem}
          numColumns={numColumns}
          directionalLockEnabled={true}
        />
      </View>
    );
  }
}

class CatVideoButton extends React.Component {
  backToStart = async () => {
    await this._video.stopAsync();
    await this._video.setPositionAsync(0);
  };

  play = async () => {
    await this._video.replayAsync();
  };

  render() {
    return (
      <View style={{padding: 0}}>
        <TouchableHighlight onPress={this.play}>
          <Video
            source={this.props.source}
            style={{
              width: this.props.width || this.props.size || 400,
              height: this.props.height || this.props.size || 400,
            }}
            resizeMode="cover"
            shouldPlay={true}
            ref={val => {
              this._video = val;
            }} //Set the reference of the <Video> to _video property
            onPlaybackStatusUpdate={status => {
              if (status.didJustFinish) {
                this.backToStart();
              }
            }}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const numColumns = 3;
const size = Dimensions.get('window').width / numColumns;
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
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'CopperBlackRegular',
  },
  itemContainer: {
    width: size,
    height: size,
  },
});
