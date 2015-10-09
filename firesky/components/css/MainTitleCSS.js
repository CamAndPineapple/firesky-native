'use strict';

var React = require('react-native');

var {StyleSheet} = React;

let styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  mainTitle: {
    marginTop: 200,
    marginBottom: 200,
    fontSize: 40,
    letterSpacing: 10,
    color: 'white',
    backgroundColor: 'transparent'
  },
  searchContainer: {
    alignSelf: 'center'
  },
  searchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5722',
    height: 40,
    width: 150
  },
  searchButtonText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '600'
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center'
  },
  searchInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    alignSelf: 'center'
  }
});

module.exports = styles;
