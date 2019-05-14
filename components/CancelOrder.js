import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, AsyncStorage, TouchableOpacity} from 'react-native';
import StarRating from "react-native-star-rating";
import Moment from 'moment';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerName: '',
      serviceCategory: '',
      price: 0,
      dateOrdered: '',
      progressData: this.data,
      orderId: null
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const orderId = JSON.parse(JSON.stringify(navigation.getParam('orderId', 'NO-NAME')));
    AsyncStorage.getItem('userId', (err, result) => {

      fetch('http://localhost:8080/api/viewOrder/?id=' + orderId)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          sellerName: responseJson.order[0].sellerName,
          serviceCategory: responseJson.order[0].serviceCategory,
          price: responseJson.order[0].price,
          dateOrdered: responseJson.order[0].dateOrdered,
          orderId: responseJson.order[0].id
        });
      })
      .catch((error) =>{
        console.error(error);
      });
    });
  }

  cancelOrder = (orderId) => {
    if (orderId !== 0) {

      fetch('http://localhost:8080/api/cancelOrder/?id=' + orderId)
      .then((response) => response.json())
      .then((responseJson) => {

      })
      .catch((error) =>{
        console.error(error);
      });

      this.props.navigation.navigate("ViewOrders", {
      });
    }
  }

  render() {
    const { navigation } = this.props;
    Moment.locale('en');

    return (
      <View>

        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
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
              fontSize: 35,
              fontWeight: "bold",
              paddingHorizontal: 20,
              marginTop: 15,
              marginBottom: 15,
              textAlign: 'center',
              color: '#000'
            }}>
            {this.state.sellerName}
          </Text>

          <StarRating
            disabled={true}
            maxStars={5}
            rating={4.5}
            starSize={16}
            fullStarColor="orange"
            emptyStarColor="orange"
            style={{ padding: 8 }}
          />
        </View>

        <View
          style={{
            borderBottomColor: '#E88D72',
            borderBottomWidth: 2,
            marginTop: 20,
            marginBottom: 35
          }}
        />

        <Text
          style={{
            fontSize: 33,
            paddingHorizontal: 20,
            marginTop: 15,
            marginBottom: 15,
            textAlign: 'center',
            color: '#000'
          }}>
          Are you sure you would like to cancel?
        </Text>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={st.btn}
            onPress={() => this.cancelOrder(this.state.orderId)}
          >
            <Text style={st.btnText}>Yes, cancel</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default Order;
