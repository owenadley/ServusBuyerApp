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
  Button,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ServicePreview from "./ServicePreview.js";
import Category from "./Category.js";
import { StripeAddCard, SelectPayment } from 'react-native-checkout';
import StarRating from "react-native-star-rating";

class CheckoutServiceLawnMowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: "",
      stripeCustomer: [],
      refreshing: false,
      lawnSize: null,
      serviceInfo: []
    };
    this.chooseLawnSize = this.chooseLawnSize.bind(this);
    this.continueToPayment = this.continueToPayment.bind(this);
  }

  componentWillMount() {
    const serviceInfo = this.props.navigation.getParam("serviceInfo", "NO-SERVICE");
    this.setState({serviceInfo: serviceInfo});

    AsyncStorage.getItem('userId', (err, result) => {
      const { navigation } = this.props;
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

    this.props.navigation.navigate('PurchaseService', {
      serviceInfo: this.state.serviceInfo
    });
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
            <Text style={{fontSize:30, color: '#000'}}>{this.state.serviceInfo[0].sellerName}</Text>
            <Text style={{fontSize:15}}>{this.state.serviceInfo[0].serviceCategory} Service</Text>
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
        <View style={{alignItems:'center'}}>
          <View style={{flexDirection:'row'}}>
            <Icon name="dollar" size={30} color='#E88D72'/>
            <Text style={{marginBottom:10, fontSize:20, marginLeft:10}}>{this.state.serviceInfo[0].minPrice} - {this.state.serviceInfo[0].maxPrice}</Text>
          </View>
          <Text style={{fontSize:20}}>Select your lawn size:</Text>
        </View>


          <View style={ {flex: 1, flexDirection: 'row', marginTop:50}}>

              <View style={{flex:1, height:100}}>
                <View style={{width:110, height:110, alignItems:'center', justifyContent:'flex-end'}}>
                  <Image
                    source={require("../image/grass.png")}
                    style={{
                      width: 80,
                      height: 80,

                    }}
                  />
                </View>
                <Button title='SM' onPress={() => this.chooseLawnSize('SM')}/>
              </View>

            <View style={{flex:1, height:100}}>
              <View style={{width:110, height:110, alignItems:'center', justifyContent:'flex-end'}}>
                <Image
                  source={require("../image/grass.png")}
                  style={{
                    width: 100,
                    height: 100,

                  }}
                />
              </View>
              <Button title='MD' onPress={() => this.chooseLawnSize('MD')}/>
            </View>

            <View style={{flex:1, height:100}}>
              <View style={{width:110, height:110, alignItems:'center', justifyContent:'flex-end'}}>
                <Image
                  source={require("../image/grass.png")}
                  style={{
                    width: 130,
                    height: 130,

                  }}
                />
              </View>
              <Button title='LG' onPress={() => this.chooseLawnSize('LG')}/>
            </View>
          </View>
          <View style={{alignItems:'center'}}>
            <Text style={st.heading2}>Selected Size: {this.state.lawnSize}</Text>
            <TouchableOpacity
              style={st.btn}
              onPress={() => this.continueToPayment()}
            >
              <Text style={st.btnText}>Purchase Order</Text>
            </TouchableOpacity>
          </View>
      </View>

    );
  }
}

const st = require("./style");
const styles = StyleSheet.create({});
export default CheckoutServiceLawnMowing;
