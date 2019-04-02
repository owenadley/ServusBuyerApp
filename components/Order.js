import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';
import Timeline from 'react-native-timeline-listview';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';
import { StripeAddCard } from 'react-native-checkout';
import NavigationService from'./NavigationService.js';



class Order extends Component {
  constructor(props) {
    super(props);
    this.data = [
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    ],
    this.state = {
      sellerName: '',
      serviceCategory: '',
      price: 0,
      progressData: this.data,

    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const orderId = JSON.parse(JSON.stringify(navigation.getParam('selectedOrder', 'NO-NAME')));
    AsyncStorage.getItem('userId', (err, result) => {

      fetch('http://localhost:8080/api/viewOrder/?id=' + orderId)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          sellerName: responseJson.order[0].sellerName,
          serviceCategory: responseJson.order[0].serviceCategory,
          price: responseJson.order[0].price,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
    });
  }


  render() {
    const { navigation } = this.props;
    return (
      <View>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>

          <Image
            source={require("../image/LawnMowing.jpg")}
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,
            }}
          />

        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "300",
              paddingHorizontal: 20,

              marginTop: 15,
              textAlign: 'center'
            }}>
            {this.state.sellerName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "300",
              paddingHorizontal: 20,

              marginTop: 10,
              textAlign: 'center'
            }}>
            {this.state.serviceCategory + ' Services'}
            </Text>
        </View>

        <View
          style={{
            borderBottomColor: '#E88D72',
            borderBottomWidth: 2,
            marginTop: 20
          }}
        />


        <Timeline
          data={this.state.progressData}
        />


      </View>

    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default Order;
