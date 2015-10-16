/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

let React = require('react-native');
let Forecast = require('./Forecast.ios');
let styles = require('./css/MainTitleCSS.js');

let {StyleSheet, Text, Image, View, Component, TouchableHighlight, TextInput, AlertIOS} = React;

class MainTitle extends Component {

  constructor(props) {
    super(props);
    this.API_KEY_WU = '42e0777a5e56eeaf';
    this.API_KEY_FIO = 'e9a70b3c8567afd2b17b50b9699f6a24';
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      city: 'unknown city',
      state: 'unknwon state',
      clouds: 'unknown percentage',
      isFinished: false
    };
  }

  componentDidMount() {
    this.getUserCoordinates();
  }

  componentWillUnmount() {
    navigator.geolocation
      .clearWatch(this.watchID);
  }

  getUserCoordinates() {
    navigator.geolocation
      .getCurrentPosition((initialPosition) => {
        this.latitude = JSON.stringify(initialPosition.coords.latitude);
        this.longitude = JSON.stringify(initialPosition.coords.longitude);
      }, (error) => alert(error.message), {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      });
    this.watchID = navigator.geolocation
      .watchPosition((lastPosition) => {
        this.setState({lastPosition});
      });
  }

makeAPIRequests() {

   this.REQUEST_WUNDERGROUND = 'https://api.wunderground.com/api/' + this.API_KEY_WU + '/geolookup/conditions/astronomy/forecast/q/' + this.latitude + ',' + this.longitude + '.json';
  this.REQUEST_FORECASTIO = 'https://api.forecast.io/forecast/' + this.API_KEY_FIO + '/' + this.latitude + ',' + this.longitude;

  fetch(this.REQUEST_WUNDERGROUND).then((response) => response.json()).then((responseData) => {
    this.setState({
      city: responseData.location.city
    });
  }).then(() => {
    fetch(this.REQUEST_FORECASTIO).then((response) => response.json()).then((responseData) => {
      this.setState({
        clouds: responseData.currently.cloudCover,
        isFinished: true
      });
    }).done(() => {
      this.pushAPI();
    });
  }).done();

}

pushAPI() {
  this.props.navigator.push({
        title: 'Forecast',
        component: Forecast,
        passProps: {
          city: this.state.city,
          clouds: this.state.clouds,
        }
      });
}






  _getLocationButtonPress() {
    this.makeAPIRequests();

  }

  render() {
    return (
      <View style={styles.masterContainer}>
        <Image source={{
          uri: 'http://astrophoto.com/JonTalbotandMilkyWay.jpg'
        }} style={styles.backgroundImage}>
          <Text style={styles.mainTitle}>
            FIRESKY
          </Text>
          <View style={styles.searchContainer}>
            <TouchableHighlight onPress={() => this._getLocationButtonPress()}>
              <View style={styles.searchButton}>
                <Text style={styles.searchButtonText}>
                  Get Forecast
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </Image>
      </View>
    );
  }
}

module.exports = MainTitle;
