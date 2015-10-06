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
      <NavigatorIOS
                 style={styles.container}
                 initialRoute={{
             title: 'Search',
             component: MainTitle
         }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('firesky', () => firesky);
