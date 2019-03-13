import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';
import ServicePreview from './ServicePreview.js';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
    }
  }

  static navigationOptions = {
    title: 'Servus',
  };


  render() {
    const { navigation } = this.props;
    const firstName = JSON.parse(JSON.stringify(navigation.getParam('firstName', 'NO-NAME')));
    return (
      <View style={st.container}>
        <Text style={st.heading2}> Welcome to Servus Home Page</Text>
        <ServicePreview />
      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default CreateAccount;
