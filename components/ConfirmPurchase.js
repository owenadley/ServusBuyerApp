import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  TouchableOpacity
} from "react-native";
import StarRating from "react-native-star-rating";
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";
import StepIndicator from "react-native-step-indicator";

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
    this.setState({
      sellerName: serviceInfo[0].sellerName,
      serviceCategory: serviceInfo[0].serviceCategory
    });
  }

  confirmPurchase = () => {
    AsyncStorage.getItem("userId", (err, result) => {
      const serviceInfo = this.props.navigation.getParam("serviceInfo", "NO-SERVICE");
      fetch('http://localhost:8080/api/purchaseService?id=' + result, {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            serviceId: serviceInfo[0].id,
            sellerId: serviceInfo[0].sellerID,
            sellerName: serviceInfo[0].sellerName,
            serviceCategory: serviceInfo[0].serviceCategory,
            serviceName: serviceInfo[0].serviceName,
            serviceDescription: serviceInfo[0].serviceDescription,
            minPrice: serviceInfo[0].minPrice,
            maxPrice: serviceInfo[0].maxPrice,
         }),
      });
    });
    this.props.navigation.navigate('ServiceOrdered');
  }

  render() {
    const { navigation } = this.props;

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
                    currentPosition={2}
                    labels={[]}
                  />
                </View>
                <View>
                  <View style={{alignItems:'center'}}>
                    <TouchableOpacity
                      style={st.btn}
                      onPress={() => this.confirmPurchase()}
                    >
                      <Text style={st.btnText}>Confirm Purchase</Text>
                    </TouchableOpacity>
                  </View>
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
export default ConfirmPurchase;
