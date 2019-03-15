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
      serviceName: '',
      serviceDescription: '',
      sellerName: '',
      minPrice: 0,
      maxPrice: 0,
    }
  }

  componentDidMount() {
    // const { navigation } = this.props;
    // fetch('http://localhost:8080/api/getUsers?id=' + id)
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   this.setState({
    //
    //     serviceInfo: responseJson.serviceInfo
    //
    //   }, function(){
    //
    //   });
    // })
    // .catch((error) =>{
    //   console.error(error);
    // });
  }


  render() {
    const { navigation } = this.props;
    return (
      <View style={st.container}>
          <Text style={st.heading1}>{this.state.serviceName}</Text>
          <Text style={st.heading2}>Seller: {this.state.sellerName}</Text>
          <Text style={st.heading2}>Description: {this.state.serviceDescription}</Text>
          <Text style={st.heading2}>Price Range: {this.state.minPrice} - {this.state.maxPrice}</Text>
      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default Service;
