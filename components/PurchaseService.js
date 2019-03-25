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
  Image
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import ServicePreview from "./ServicePreview.js";
import Category from "./Category.js";
import { StripeAddCard, SelectPayment } from 'react-native-checkout';

class PurchaseService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      stripeCustomer: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('userId', (err, result) => {
      var encodedID = encodeURIComponent(result);
      fetch(`http://localhost:8080/api/getStripeCustomer?id=${encodeURIComponent(encodedID)}`, {
        method: "GET",
        headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //alert(responseJson.stripeCustomer.id);
        this.setState({
          stripeCustomer: responseJson.stripeCustomerCards
        })
      })
      //alert(this.state.stripeCustomer);
    });
  }

  addNewCard = () => {
    this.props.navigation.navigate('AddNewCard');
  }
  confirmPurchase = () => {
    this.props.navigation.navigate('ConfirmPurchase');
  }

  render() {
    const { navigation } = this.props;
    AsyncStorage.getItem("userId", (err, result) => {

    });
    return (
      <View style={{flex: 1, marginTop: 20}}>
        <SelectPayment
          enableApplePay={true} // optional, default: false
          applePayHandler={() => console.log('apple pay happened')} // optional
          paymentSources={this.state.stripeCustomer} // mandatory, See: [Customer Object](https://stripe.com/docs/api/node#customer_object) -> sources -> data for Stripe format.
          addCardHandler={() => this.addNewCard()}
          selectPaymentHandler={() => this.confirmPurchase()}
        />
      </View>
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create({});
export default PurchaseService;
