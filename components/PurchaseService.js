import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ScrollView,
  Image,
  RefreshControl
} from "react-native";
import { SelectPayment } from 'react-native-checkout';
import StarRating from "react-native-star-rating";
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";
import StepIndicator from "react-native-step-indicator";

class PurchaseService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      stripeCustomer: [],
      refreshing: false,
      serviceInfo: []
    };
  }

  componentDidMount() {

    const serviceInfo = this.props.navigation.getParam("serviceInfo", "NO-SERVICE");
    this.setState({
      sellerName: serviceInfo[0].sellerName,
      serviceCategory: serviceInfo[0].serviceCategory
    });
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
          stripeCustomer: responseJson.stripeCustomerCards,
          serviceInfo: serviceInfo
        })
      })
      //alert(this.state.stripeCustomer);
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
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
    this.setState({refreshing: false});

  }

  addNewCard = () => {
    this.props.navigation.navigate('AddNewCard');
  }
  confirmPurchase = () => {
    const serviceInfo = this.props.navigation.getParam("serviceInfo", "NO-SERVICE");
    this.props.navigation.navigate('ConfirmPurchase', {
      serviceInfo: serviceInfo
    });
  }

  render() {
    const { navigation } = this.props;

    AsyncStorage.getItem("userId", (err, result) => {

    });

    return (
      <View style={{flex:1, padding:10}}>
        <View style={{flexDirection:'row'}}>
          <Image
            source={require("../image/LawnMowing.jpg")}
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,

            }}
          />
          <View style={{flex:1, flexDirection:'column', marginLeft: 20, marginTop: 20}}>
            <Text style={{fontSize:30, color: '#000'}}>{this.state.sellerName}</Text>
            <Text style={{fontSize:15}}>{this.state.serviceCategory} Service</Text>
          </View>
          <View style={{marginTop:15, marginRight: 15}}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={4.5}
              starSize={16}
              fullStarColor="orange"
              emptyStarColor="orange"
              style={{ padding: 8,}}
            />
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#E88D72',
            borderBottomWidth: 2,
            marginTop: 20,
            marginBottom: 35
          }}
        />
        <View style={{flex:1}}>

            <IndicatorViewPager
              style={{ flex: 1 }}
              indicator={this._renderDotIndicator()}
            >

              <View style={{marginTop:100}}>
                <View>
                  <StepIndicator
                    stepCount={3}
                    // renderStepIndicator={this.renderStepIndicator}
                    customStyles={secondIndicatorStyles}
                    currentPosition={1}
                    labels={[]}
                  />
                </View>
                <View>
                  <ScrollView style={{}}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                      />
                    }>
                    <SelectPayment
                      enableApplePay={true} // optional, default: false
                      applePayHandler={() => console.log('apple pay happened')} // optional
                      paymentSources={this.state.stripeCustomer} // mandatory, See: [Customer Object](https://stripe.com/docs/api/node#customer_object) -> sources -> data for Stripe format.
                      addCardHandler={() => this.addNewCard()}
                      selectPaymentHandler={() => this.confirmPurchase()}
                    />
                  </ScrollView>
                </View>
              </View>
          </IndicatorViewPager>
        </View>
      </View>
    );
  }
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} style={{ paddingBottom: 3 }} />;
  }

  renderViewPagerPage = data => {
    return (
      <View style={styles.page}>
        <Text>{data}</Text>
      </View>
    );
  };

  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  );
}

const st = require("./style");
const styles = StyleSheet.create({});
const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013"
};
export default PurchaseService;
