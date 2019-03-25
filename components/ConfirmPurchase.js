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
      username: ""
    };
  }

  confirmPurchase = () => {
    AsyncStorage.getItem("userId", (err, result) => {
      fetch('http://localhost:8080/api/purchaseService?id=' + result, {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
      });
    });
    this.props.navigation.navigate('Home');
  }

  render() {
    const { navigation } = this.props;
    AsyncStorage.getItem("userId", (err, result) => {

    });
    return (
      <View style={{flex: 1, marginTop: 20}}>
        <Button title='Order' onPress={() => this.confirmPurchase()}/>
      </View>
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create({});
export default ConfirmPurchase;
