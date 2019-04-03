import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, AsyncStorage, TextInput, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import LottieView from 'lottie-react-native';

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
      <View style={{
        flex:1,
        justifyContent: 'flex-start',
        backgroundColor: '#f2f2f2',
        alignItems: 'center'

      }}>

      <LottieView style={{position:'absolute',top:50}}source={require('../image/orderComplete.json')} autoPlay loop={false} />
        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#000', marginTop:200}}>Your Order Has Been Placed!</Text>
        <TouchableOpacity
          style={st.btn}
          onPress={() => this.backToHome()}
        >
          <Text style={st.btnText}>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default ServiceOrdered;
