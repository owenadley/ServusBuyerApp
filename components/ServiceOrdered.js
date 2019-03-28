import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, AsyncStorage, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';


class ServiceOrdered extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  backToHome = () => {
    this.props.navigation.navigate('Home');
  }

  render() {

    const { photo } = this.state;
    return (
      <View style={st.container}>
          <Text style={st.heading1}>Your Order Has Been Placed!</Text>

          <Button title='Home' onPress={() => this.backToHome()}/>

      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default ServiceOrdered;
