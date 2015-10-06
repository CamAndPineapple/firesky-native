/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

let React = require('react-native');
let Forecast = require('./Forecast.ios');
let styles = require('./css/MainTitleCSS.js');

let {
  StyleSheet,
  Text,
  Image,
  View,
  Component,
  TouchableHighlight,
  TextInput,
  AlertIOS,
} = React;




 class MainTitle extends Component {
  constructor(props) {
        super(props);
        this.state = {
          initialPosition: 'unknown',
          lastPosition: 'unknown',
          city: " ",
          state: " ",
        };
  }



  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        this.latitude = JSON.stringify(initialPosition.coords.latitude);
        this.longitude = JSON.stringify(initialPosition.coords.longitude);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition});
    });




  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getForecast() {


        AlertIOS.alert(
                'Location',
                'Longitude: ' + this.longitude + '\n'
                + 'Latitude: ' + this.latitude,
              );







    this.props.navigator.push({
      title: 'Forecast',
      component: Forecast,
      passProps: {}
    });


  }

  render() {
    return (
      <View style={styles.masterContainer}>
        <Image style={styles.backgroundImage} source={{uri: 'http://astrophoto.com/JonTalbotandMilkyWay.jpg'}}>
          <Text style={styles.mainTitle}> FIRESKY </Text>
          <View style={styles.searchContainer}>
          <TouchableHighlight onPress={() => this.getForecast()}>
            <View style={styles.searchButton} >
              <Text style={styles.searchButtonText}> Get Forecast </Text>
            </View>
          </TouchableHighlight>
          </View>
        </Image>
      </View>
      )
  }
}

module.exports = MainTitle;
