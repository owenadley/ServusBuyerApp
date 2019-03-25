import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';
import { StripeAddCard } from 'react-native-checkout';
import NavigationService from'./NavigationService.js';



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
          this.setState({serviceDescription: this.state.serviceInfo[0].serviceDescription});
          this.setState({sellerName: this.state.serviceInfo[0].sellerName});
          this.setState({minPrice: this.state.serviceInfo[0].minPrice});
          this.setState({maxPrice: this.state.serviceInfo[0].maxPrice});
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

  //navigate to purchase service screen
  purchaseService = () => {
    this.props.navigation.navigate('PurchaseService');
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={st.container}>
          <Text style={st.heading1}>{this.state.serviceName}</Text>
          <Text style={st.heading2}>Seller: {this.state.sellerName}</Text>
          <Text style={st.heading2}>Description: {this.state.serviceDescription}</Text>
          <Text style={st.heading2}>Price Range: {this.state.minPrice} - {this.state.maxPrice}</Text>

          <Button title='Order Service' onPress={() => this.purchaseService()}/>
      </View>


    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default Service;
