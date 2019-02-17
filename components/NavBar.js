/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


//type Props = {};
class NavBar extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task It</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 0.5,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    paddingLeft: 30,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
  },
});

export default NavBar;
