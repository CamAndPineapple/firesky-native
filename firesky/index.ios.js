/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

let React = require('react-native');
let styles = require('./styles.js');

let {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Component,
  TouchableHighlight,
  TextInput,
  AlertIOS,
} = React;



class firesky extends Component {
  constructor(props) {
        super(props);
        this.state = {
          initialPosition: 'unknown',
          lastPosition: 'unknown', 
          showLocation: false,
        };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
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

  getUserLocation() {

    this.setState({
      showLocation: true
    });

    AlertIOS.alert(
            'Location',
            'Longitude: ' + JSON.stringify(this.state.initialPosition.coords.longitude) + '\n' + 'Latitude: ' + JSON.stringify(this.state.initialPosition.coords.latitude),
          
          );
  }

  render() {
    return (
      <View style={styles.masterContainer}>
        <Image style={styles.backgroundImage} source={{uri: 'http://astrophoto.com/JonTalbotandMilkyWay.jpg'}}>
          <Text style={styles.mainTitle}> FIRESKY </Text>
          <View style={styles.searchContainer}>
          <TouchableHighlight onPress={this.getUserLocation.bind(this)}>
            <View style={styles.searchButton} >
              <Text style={styles.searchButtonText}> Get Location </Text>
              
            </View>
          </TouchableHighlight>
          
          </View>
        </Image>
      </View>
      )
  }
}

AppRegistry.registerComponent('firesky', () => firesky);
