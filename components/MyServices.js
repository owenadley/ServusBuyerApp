import React, {Component} from 'react';

import {Platform, StyleSheet, Text, View, Image, AsyncStorage, RefreshControl, TouchableOpacity, ScrollView} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';
import ServiceCard from "./ServiceCard.js";
class MyServices extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serviceInfo: [],
      serviceName: '',
      serviceDescription: '',
      sellerName: '',
      minPrice: 0,
      maxPrice: 0,
      servicePreviews: [],
      serviceExists: 0,
      refreshing: false
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    AsyncStorage.getItem('userId', (err, result) => {

      fetch('http://localhost:8080/api/getSellerName/?id=' + result)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.sellerName == null) {
          this.setState({
            sellerName: null,
          });
        } else {
          this.setState({
            sellerName: responseJson.sellerName,
          });
        }
      })
      .catch((error) =>{
        console.error(error);
      });

      if (this.state.sellerName != null) {

        fetch('http://localhost:8080/api/getMyServicePreviews/?id=' + result)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.serviceExists == 1) {
            this.setState({
              serviceExists: 1,
              servicePreviews: responseJson.servicePreviews
            });
          } else {
            this.setState({
              serviceExists: 0,
            });
          }
        })
        .catch((error) =>{
          console.error(error);
        });


      }

    });
  }

  sellAService = () => {
    this.props.navigation.navigate('SellAService', {
    //  firstName: this.state.firstName,
    //  email: this.state.email
    })
  }

  becomeASeller = () => {
    this.props.navigation.navigate('BecomeASeller', {
    //  firstName: this.state.firstName,
    //  email: this.state.email
    })
  }

  selectService = (data) => {
    if (data !== 0) {
      this.props.navigation.navigate('Service', {
        selectedService: data
      });
    }
  }

  // refresh control for refreshing services ordered list
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData();
    this.setState({refreshing: false});
  }

  servicePreviewList() {
    if(this.state.serviceExists) {

      return this.state.servicePreviews.map((data) => {
        return (
          <ServiceCard
            id={data.id}
            serviceName={data.serviceName}
            sellerName={data.sellerName}
            serviceDescription={data.serviceDescription}
            minPrice={data.minPrice}
            maxPrice={data.maxPrice}
            navigation={this.props.navigation}
            myServices={true}
          />
        )
      })

    } else {
      return (
        <View><Text style={st.heading2}>You have no active services</Text></View>
      )
    }
  }


  render() {
    const { navigation } = this.props;

    if (this.state.sellerName !== null) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />}
          >
          <View style={{alignItems:'center'}}>
            <Text style={{
                fontSize: 35,
                fontWeight: "bold",
                paddingHorizontal: 20,
                marginTop: 25,
                marginBottom: 15,
                textAlign: 'center',
                color: '#000'
              }}>{this.state.sellerName}</Text>

              <TouchableOpacity
                style={st.btn}
                onPress={this.sellAService.bind()}
              >
                <Text style={st.btnText}>Sell A Service</Text>
              </TouchableOpacity>

              {this.servicePreviewList()}

            </View>

        </ScrollView>
      );
    } else {
      if (this.props.navigation.getParam("sellerName")) { this.fetchData(); }
      return (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
              <Text style={st.heading2}>You have not registered as a seller, yet..</Text>
              <TouchableOpacity
                style={st.btn}
                onPress={this.becomeASeller.bind()}
              >
                <Text style={st.btnText}>Become A Seller</Text>
              </TouchableOpacity>
              />
          </ScrollView>
        );
    }
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default MyServices;
