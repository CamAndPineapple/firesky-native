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
      state: ' '
    };
  }

  componentDidMount() {

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

  componentWillUnmount() {
    navigator.geolocation
      .clearWatch(this.watchID);
  }

  fetchData() {

    this.REQUEST_URL = 'https://api.wunderground.com/api/' + this.API_KEY_WU + '/geolookup/conditions/astronomy/forecast/q/' + this.latitude + ',' + this.longitude + '.json';
    fetch(this.REQUEST_URL).then((response) => response.json()).then((responseData) => {
      this.setState({
        city: responseData.location.city
      });

      AlertIOS.alert('title', 'city: ' + this.state.city);

    }).done();
  }

  getForecast() {

    this.fetchData();

    this.props
      .navigator
      .push({
        title: 'Forecast',
        component: Forecast,
        passProps: {}
      });

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
            <TouchableHighlight onPress={() => this.getForecast()}>
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
