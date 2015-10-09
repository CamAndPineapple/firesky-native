'use strict';

var React = require('react-native');
var MainTitle = require('./MainTitle.ios');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;

var firesky = React.createClass({
  render: function() {
    return (
      <NavigatorIOS initialRoute={{
        title: 'Search',
        component: MainTitle
      }} style={styles.container}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('firesky', () => firesky);
