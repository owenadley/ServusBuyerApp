'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    heading1: {
        fontFamily: 'Arial',
        fontSize: 40,
        textAlign: 'center',
        color: '#000000',
        margin: 40
    },
    heading2: {
      fontFamily: 'Arial',
      fontSize: 20,
      textAlign: 'center',
      color: '#000000',
      margin: 10
    },
    bodyBlack:{
      fontFamily: 'Arial',
      fontSize: 15,
      color: '#000000'
    },
    bodyWhite:{
      fontFamily: 'Arial',
      fontSize: 15,
      color: '#ffffff'
    },
    container: {
      flex: 6,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: 'white',
      padding: 10,
    },
    horizontalBorder:{
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      padding: 10
    }

});