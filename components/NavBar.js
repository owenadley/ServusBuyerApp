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


type Props = {};
export default class NavBar extends Component<Props> {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task It</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  header: {
    flex: 1,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
    paddingLeft: 30,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
