import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Asset, Constants, Permissions} from 'react-native-unimodules';
import * as Location from 'expo-location';

export default class MapApp extends React.Component {
  state = {
    location: null,
    hospital: null,
    where: null,
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    // let { status } = await Permissions.getAsync(Permissions.LOCATION)
    let {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission not granted');
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);

    let mausoleum = (await Location.geocodeAsync(
      'Vietnam National Cancer Hospital',
    ))[0];
    console.log(mausoleum);

    let where = await Location.reverseGeocodeAsync(location.coords);
    console.log(where);

    this.setState({
      location: location.coords,
      mausoleum: mausoleum,
      where: where,
    });
  };

  onRegionChange = location => {
    this.setState({location});
  };

  render() {
    if (!this.state.location) {
      return (
        <ActivityIndicator
          style={{justifyContent: 'center', flex: 1}}
          animating={true}
        />
      );
    }

    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude,
          latitudeDelta: 0.0922 / 2.5,
          longitudeDelta: 0.0421 / 2.5,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}>
        <Marker
          coordinate={this.state.location}
          title="You are here"
          pinColor="green"
          description={this.state.where.city}
        />
        <Marker
          coordinate={this.state.hospital}
          title="Hospital"
          pinColor="pink"
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
