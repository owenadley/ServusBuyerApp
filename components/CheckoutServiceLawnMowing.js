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
      lawnSize: null
    };
    this.chooseLawnSize = this.chooseLawnSize.bind(this);
    this.continueToPayment = this.continueToPayment.bind(this);
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

  chooseLawnSize = (size) => {
    //alert('yeet');
    this.setState({
      lawnSize: size
    });
  }

  continueToPayment = () => {
  //  alert('here');
    this.props.navigation.navigate('PurchaseService', {

    });
  }

  render() {
    const { navigation } = this.props;
    const serviceInfo = this.props.navigation.getParam("serviceInfo", "NO-SERVICE")
    //this.setState({serviceInfo: serviceInfo});
    //alert(this.state.serviceInfo);
    return (
      <View style={{flex:1}}>
          <Text style={st.heading1}>{serviceInfo[0].serviceName}</Text>
          <Text style={st.heading2}>$ {serviceInfo[0].minPrice} - {serviceInfo[0].maxPrice} depending on lawn size</Text>
          <Text style={st.heading2}>Select you lawn size:</Text>
          <View style={ {flex: 1, flexDirection: 'row'}}>
            <View style={{flex:1, height:100, backgroundColor: 'grey'}}>
              <Button title='SM' onPress={() => this.chooseLawnSize('SM')}/>
            </View>
            <View style={{flex:1, height:100, backgroundColor: 'green'}}>
              <Button title='MD' onPress={() => this.chooseLawnSize('MD')}/>
            </View>
            <View style={{flex:1, height:100, backgroundColor: 'steelblue'}}>
              <Button title='LG' onPress={() => this.chooseLawnSize('LG')}/>
            </View>
          </View>
          <Text style={st.heading2}>Selected Size: {this.state.lawnSize}</Text>
          <Button title='Place Order' onPress={() => this.continueToPayment()}/>
      </View>
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create({});
export default CheckoutServiceLawnMowing;
