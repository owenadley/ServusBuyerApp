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
  RefreshControl,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import ServicePreview from "./ServicePreview.js";
import Category from "./Category.js";
import { StripeAddCard, SelectPayment } from 'react-native-checkout';

class CheckoutServiceLawnMowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      stripeCustomer: [],
      refreshing: false,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('userId', (err, result) => {
      const { navigation } = this.props;
      const serviceInfo = this.props.navigation.getParam("serviceInfo", "NO-SERVICE")
      this.setState({serviceInfo: serviceInfo});

      var encodedID = encodeURIComponent(result);

      //alert(this.state.stripeCustomer);
    });
  }



  render() {
    const { navigation } = this.props;
    const serviceInfo = this.props.navigation.getParam("serviceInfo", "NO-SERVICE")
    //this.setState({serviceInfo: serviceInfo});
    //alert(this.state.serviceInfo);
    return (
      <View>
          <Text style={st.heading1}>{serviceInfo[0].serviceName}</Text>
          <Text>Purchase Service</Text>
          <Text>Select you lawn size:</Text>
          <Button title='Small'/>
          <Button title='Medium'/>
          <Button title='Large'/>
      </View>
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create({});
export default CheckoutServiceLawnMowing;
