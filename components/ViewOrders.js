import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, AsyncStorage, TextInput, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Moment from 'moment';


class ViewOrders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      servicesOrdered: [],
      refreshing: false,
      ordersExist: false
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    AsyncStorage.getItem('userId', (err, result) => {

      fetch('http://localhost:8080/api/getMyOrders/?id=' + result)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          servicesOrdered: responseJson.orders,
          ordersExist: responseJson.ordersExist
        });
      })
      .catch((error) =>{
        console.error(error);
      });

    });
  }

  // refresh control for refreshing services ordered list
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData();
    this.setState({refreshing: false});
  }

  // navigate to a specific order page once clicked by user
  selectOrder = data => {
    if (data !== 0) {
      this.props.navigation.navigate("Order", {
        selectedOrder: data
      });
    }
  };

  // render all orders purchased by user
  getOrders() {
    if (this.state.ordersExist) {
      return this.state.servicesOrdered.map(data => {
        return (
        <TouchableOpacity onPress={() => this.selectOrder(data.id)}>
            <View style={{
              alignItems: 'center',
              borderBottomColor: '#E88D72',
              borderBottomWidth: 1,
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
             }}>
              <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: 50
              }}>

                <Text style={{ fontSize: 30, }}>{data.sellerName}</Text>
                <Text style={{ marginBottom: 10 }}>{data.serviceCategory}</Text>
                <Text style={{}}>Ordered {Moment(this.state.dateOrdered).format('MMMM Do')}</Text>
              </View>

              <Image
                source={require("../image/LawnMowing.jpg")}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  margin: 20,
                  marginRight: 40
                }}
              />

            </View>
          </TouchableOpacity>
        );
      });
    } else {
      return (
        <View>
          <View
            style={{
              borderBottomColor: '#E88D72',
              borderBottomWidth: 5,
              marginTop: 20,
              marginBottom: 65
            }}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: "200",
              paddingHorizontal: 20,
              marginTop: 15,
              marginBottom: 15,
              textAlign: 'center',
              color: 'grey'
            }}>You have not placed any orders, yet..</Text>
          </View>
      )
    }
  }

  render() {
    const { navigation } = this.props;
    var style;
    Moment.locale('en');
    return (
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
          <Text style={st.heading1}>Active Orders</Text>
          {this.getOrders()}
      </ScrollView>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default ViewOrders;
