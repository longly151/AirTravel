/* eslint-disable no-console */
import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView from '../../MapView';

const styles = StyleSheet.create({
  container: {},
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

export default class CustomView extends React.Component<{
  currentMessage: any
  containerStyle: any
  mapViewStyle: any
}> {
  static defaultProps = {
    currentMessage: {},
    containerStyle: {},
    mapViewStyle: {},
  };

  openMapAsync = async () => {
    const { currentMessage: { location = {} } = {} } = this.props;

    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`,
      default: `http://maps.google.com/?q=${location.latitude},${location.longitude}`,
    });

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        return Linking.openURL(url);
      }
      console.log('Opening the map is not supported.');
      return true;
    } catch ({ message }) {
      console.log(message);
      return false;
    }
  };

  render() {
    const { currentMessage, containerStyle, mapViewStyle } = this.props;
    if (currentMessage.location) {
      return (
        <TouchableOpacity
          style={[styles.container, containerStyle]}
          onPress={this.openMapAsync}
        >
          <MapView
            style={[styles.mapView, mapViewStyle]}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          />
        </TouchableOpacity>
      );
    }
    return null;
  }
}
