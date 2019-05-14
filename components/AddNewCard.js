import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from "react-native";
import { StripeAddCard } from 'react-native-checkout';

const MyScanCardContainer = (props) => {
  return <View style={{ flex: 1 }}>
    <TouchableOpacity onPress={() => props.onClose()} style={{marginTop: 20, padding: 20, width: 150}}>
      <Text style={{fontSize: 18}}>Close</Text>
    </TouchableOpacity>
    {props.children}
  </View>
}

class AddNewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      cardToken: {}
    };
  }

  // cardAdded = (token) => {
  //   alert(token);
  //   AsyncStorage.getItem("userId", (err, result) => {
  //     alert(err);
  //     fetch('http://localhost:8080/api/newCardStripe?id=' + result, {
  //        method: 'POST',
  //        headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //        },
  //        body: {
  //           token: token
  //        },
  //     });
  //   });
  //   this.props.navigation.navigate('PurchaseService');
  // }



  render() {
    const { navigation } = this.props;
    AsyncStorage.getItem("userId", (err, result) => {
    });

    return (
      <View style={{flex: 1}}>
        <StripeAddCard
        publicStripeKey="pk_test_vMOZ5SXjEAYKWtziGo0RcWrr00PMOjAND1"
        addCardTokenHandler={(stripeCardToken) => {
          //alert(JSON.stringify(stripeCardToken));
          AsyncStorage.getItem("userId", (err, result) => {
            //alert(err);
            fetch('http://localhost:8080/api/newCardStripe?id=' + result + '&token=' + stripeCardToken, {
               method: 'POST',
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
               }
            });
          });
          this.props.navigation.goBack();

        }}
        styles={{}} // Override default styles <LINK HERE>
        onCardNumberBlur={() => console.log('card number blurred')}
        onCardNumberFocus={() => console.log('card number focused')}
        onCvcFocus={() => console.log('cvc focused')}
        onCvcBlur={() => console.log('cvc blurred')}
        onExpiryFocus={() => console.log('expiry focused')}
        onExpiryBlur={() => console.log('expiry blurred')}
        onScanCardClose={() => console.log('scan card closed')}
        onScanCardOpen={() => console.log('scan card opened')}
        activityIndicatorColor="pink"
        addCardButtonText="Add Card"
        scanCardButtonText="Scan Card"
        scanCardAfterScanButtonText="Scan Card Again"
        scanCardContainer={MyScanCardContainer}
      />
      </View>
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create({});
export default AddNewCard;
