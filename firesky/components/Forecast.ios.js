'use strict';

let React = require('react-native');
let styles = require('./css/ForecastCSS.js');

var {StyleSheet, View, Text, Component, Image, AlertIOS} = React;

class Forecast extends Component {
  constructor(props) {
    super(props);

    this.arrayOfMoonPhaseImg = {

    };

    // this.imgFirst = 'image!' + this.props.moonClipped;
    // this.img = require(this.imgFirst);


    // AlertIOS.alert(
    //   'moon',
    //   'image: ' + typeof this.props.moonClipped
    // );
    //




  }

  render() {
    return (
      <View style={styles.masterContainer}>
        <Image source={{
          uri: 'http://astrophoto.com/JonTalbotandMilkyWay.jpg'
        }} style={styles.backgroundImage}>
        <View style={styles.variablesContainer}>
          <Text style={styles.labelText}>City: <Text style={styles.variableText}>{this.props.city}</Text> </Text>
          <Text style={styles.labelText}>Cloud Coverage: <Text style={styles.variableText}>{this.props.clouds} %</Text> </Text>
          <Text style={styles.labelText}>illumination: <Text style={styles.variableText}>{this.props.illumination} %</Text> </Text>
          <Text style={styles.labelText}>Moon Phase: <Text style={styles.variableText}>{this.props.moonPhase} </Text> </Text>
          <Text style={styles.labelText}>Moon Age: <Text style={styles.variableText}>{this.props.moonAge} </Text> </Text>
          <Text style={styles.labelText}>Weighted Average: <Text style={styles.variableText}>{this.props.weightedAvg}</Text> </Text>
        </View>
        <View style={styles.moonPhaseContainer}>
          <Image
            style={styles.image}
            source={{uri: this.props.moonClipped}}
          />
        <Text style={styles.labelText}>Moon Clipped: <Text style={styles.variableText}>{this.props.moonClipped} </Text> </Text>
        </View>
        </Image>
      </View>
    );
  }
}

module.exports = Forecast;
