'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

let styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  variablesContainer: {
    height: 200,
    width: 300,
    backgroundColor: 'rgba(0,0,0,.68)',
  },
  labelText: {
    color: '#00D8FF'
  },
  variableText: {
    color: '#fff',
  }

});

module.exports = styles;
