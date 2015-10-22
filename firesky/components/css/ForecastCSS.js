'use strict';

let React = require('react-native');

let {
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
  image: {
    resizeMode: 'stretch',
    flex: 1,
    height: 100,
    width: 100,

  },
  variablesContainer: {
    height: 200,
    width: 300,
    padding: 15,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,.68)',
  },
  moonPhaseContainer: {
    margin: 5,
    height: 200,
    width: 300,
    padding: 15,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,.68)',
  },
  percentageBar: {
    height: 20,
    width: 300,
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,.68)',
  },
  labelText: {
    color: '#00D8FF',
    fontSize: 18,
    letterSpacing: 1,
  },
  variableText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
  }

});

module.exports = styles;
