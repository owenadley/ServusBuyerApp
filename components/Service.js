import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceInfo: [],
      serviceName: ''
    }
  }

  static navigationOptions = {
    title: 'Servus',
  };


  componentDidMount() {
    const { navigation } = this.props;
    const id = JSON.parse(JSON.stringify(navigation.getParam('selectedService', 'NO-NAME')));
    fetch('http://localhost:8080/api/getServiceInfo?service=' + id)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        serviceInfo: responseJson.serviceInfo
      }, function(){
        if(this.state.serviceInfo){
          this.setState({serviceName: this.state.serviceInfo[0].serviceName});
          //var serviceCount = Object.keys(this.state.serviceInfo);
          //alert(this.state.serviceInfo[0].serviceName);
        } else {
          //navigate to Create Account
          alert("Something went wrong");

        }
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }


  render() {
    const { navigation } = this.props;
    return (
      <View style={st.container}>
          <Text>{this.state.serviceName}</Text>
      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default Service;
