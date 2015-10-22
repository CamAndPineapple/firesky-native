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
      state: 'unknown state',
      clouds: 'unknown percentage',
      illumination: 'unknown illum',
      moonPhase: 'unknown phase',
      moonAge: 'uknown age',
      moonClipped: ' ',
      weightedAvg: 'unknown avg',
      gotCoordinates: false,

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
        this.setState({
          gotCoordinates: true,
        });
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
    this.cloudWeighted = 0;
    this.cloudPercentage = 0;

    this.illumWeighted = 0;
    this.illumPercentage = 0;

    this.cloudWeight = 0.70;
    this.illumWeight = 0.30;
    this.moonPhaseVar = '';

    fetch(this.REQUEST_WUNDERGROUND).then((response) => response.json()).then((responseData) => {

      this.illumPercentage = responseData.moon_phase.percentIlluminated;

      if (this.illumPercentage >= 80) {
        this.illumWeighted = 1 * this.illumWeight;
      }
      else if (this.illumPercentage >= 60) {
        this.illumWeighted = 2 * this.illumWeight;
      }
      else if (this.illumPercentage >= 40) {
        this.illumWeighted = 3 * this.illumWeight;
      }
      else if (this.illumPercentage >= 10) {
        this.illumWeighted = 4 * this.illumWeight;
      }
      else if (this.illumPercentage >= 0) {
        this.illumWeighted = 5 * this.illumWeight;
      }

      this.setState({
        city: responseData.location.city,
        state: responseData.location.state,
        illumination: responseData.moon_phase.percentIlluminated,
        moonPhase: responseData.moon_phase.phaseofMoon,
        moonAge: responseData.moon_phase.ageOfMoon,
        moonClipped: responseData.moon_phase.phaseofMoon.split(' ').join(''),
      });
    }).then(() => {
      fetch(this.REQUEST_FORECASTIO).then((response) => response.json()).then((responseData) => {

        // get cloud cover which comes as a decimal between 0 and 1
        this.cloudPercentage = 100 * responseData.currently.cloudCover;

        if (this.cloudPercentage >= 80) {
          this.cloudWeighted = 1 * this.cloudWeight;
        }
        else if (this.cloudPercentage >= 60) {
          this.cloudWeighted = 2 * this.cloudWeight;
        }
        else if (this.cloudPercentage >= 40) {
          this.cloudWeighted = 3 * this.cloudWeight;
        }
        else if (this.cloudPercentage >= 10) {
          this.cloudWeighted = 4 * this.cloudWeight;
        }
        else if (this.cloudPercentage >= 0) {
          this.cloudWeighted = 5 * this.cloudWeight;
        }

        this.setState({
          clouds: this.cloudPercentage,
          isFinished: true
        });
      }).done(() => {
        this.pushAPI();
      });
    }).done();

  }

  pushAPI() {

    this.setState({
      weightedAvg: (this.cloudWeighted + this.illumWeighted) * 20
    });

    if (this.weightedAvg >= 0) {
      AlertIOS.alert('title', 'weightedAVG' + this.weightedAvg * 20);
    }
    else if (this.weightedAvg >= 1) {
      AlertIOS.alert('title', 'weightedAVG' + this.weightedAvg * 20);
    }
    else if (this.weightedAvg >= 2) {
      AlertIOS.alert('title', 'weightedAVG' + this.weightedAvg * 20);
    }
    else if (this.weightedAvg >= 3) {
      AlertIOS.alert('title', 'weightedAVG' + this.weightedAvg * 20);
    }
    else if (this.weightedAvg >= 4) {
      AlertIOS.alert('title', 'weightedAVG' + (this.weightedAvg * 20));
    }

    this.props
      .navigator
      .push({
        title: 'Forecast',
        component: Forecast,
        passProps: {
          city: this.state.city,
          state: this.state.state,
          clouds: this.state.clouds,
          illumination: this.state.illumination,
          moonPhase: this.state.moonPhase,
          moonAge: this.state.moonAge,
          moonClipped: this.state.moonClipped,
          weightedAvg: this.state.weightedAvg,

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

            {this.state.gotCoordinates ? <TouchableHighlight onPress={() => this._getLocationButtonPress()}>
              <View style={styles.searchButton}>
                <Text style={styles.searchButtonText}>
                  Get Forecast
                </Text>
              </View>
            </TouchableHighlight> : null }
          </View>
        </Image>
      </View>
    );
  }
}

module.exports = MainTitle;
