import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import ServicePreview from "./ServicePreview.js";
import Category from "./Category.js";
import { StripeAddCard, SelectPayment } from 'react-native-checkout';

class ConfirmPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      serviceInfo: null
    };
  }

  componentWillMount() {
    const serviceInfo = this.props.navigation.getParam("serviceInfo", "NO-SERVICE");
    this.setState({serviceInfo: serviceInfo});
  }

  confirmPurchase = () => {
    AsyncStorage.getItem("userId", (err, result) => {

      fetch('http://localhost:8080/api/purchaseService?id=' + result, {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            serviceId: this.state.serviceInfo[0].id,
            sellerId: this.state.serviceInfo[0].sellerID,
            sellerName: this.state.serviceInfo[0].sellerName,
            serviceCategory: this.state.serviceInfo[0].serviceCategory,
            serviceName: this.state.serviceInfo[0].serviceName,
            serviceDescription: this.state.serviceInfo[0].serviceDescription,
            minPrice: this.state.serviceInfo[0].minPrice,
            maxPrice: this.state.serviceInfo[0].maxPrice,
         }),
      });
    });
    this.props.navigation.navigate('ServiceOrdered');
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{flex: 1, marginTop: 20}}>
        <Text>{this.state.serviceInfo[0].serviceName}</Text>
        <Button title='Order' onPress={() => this.confirmPurchase()}/>
      </View>
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create({});
export default ConfirmPurchase;
