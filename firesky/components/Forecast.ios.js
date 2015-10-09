'use strict';

let React = require('react-native');
let styles = require('./css/ForecastCSS.js');

var {StyleSheet, View, Text, Component, Image} = React;

class Forecast extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.masterContainer}>
        <Image source={{
          uri: 'http://astrophoto.com/JonTalbotandMilkyWay.jpg'
        }} style={styles.backgroundImage}>
        <View style={styles.variablesContainer}>
          <Text style={styles.labelText}>City: <Text style={styles.variableText}>{this.props.city}</Text> </Text>
        </View>
        </Image>
      </View>
    );
  }
}

module.exports = Forecast;
