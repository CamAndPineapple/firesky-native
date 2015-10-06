'use strict';

let React = require('react-native');
let styles = require('./css/ForecastCSS.js');

var {
    StyleSheet,
    View,
    Text,
    Component
} = React;


class Forecast extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.masterContainer}>
            <Text> {this.props.myElement} </Text>
            </View>
        );
    }
}

module.exports = Forecast;
