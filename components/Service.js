import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from "react-native-star-rating";


class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceInfo: [],
      serviceName: '',
      serviceDescription: '',
      sellerName: '',
      minPrice: 0,
      maxPrice: 0,
      serviceCategory: '',
      myServices: false
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = JSON.parse(JSON.stringify(navigation.getParam('selectedService', 'NO-NAME')));
    try {
      let myServices = JSON.parse(JSON.stringify(navigation.getParam('myServices', 'NO-NAME')));
      this.setState({myServices:myServices});
    } catch {}



    fetch('http://localhost:8080/api/getServiceInfo?service=' + id)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        serviceInfo: responseJson.serviceInfo,
      }, function(){
        if(this.state.serviceInfo){
          this.setState({serviceId: this.state.serviceInfo[0].id});
          this.setState({serllerId: this.state.serviceInfo[0].sellerId});
          this.setState({serviceName: this.state.serviceInfo[0].serviceName});
          this.setState({serviceDescription: this.state.serviceInfo[0].serviceDescription});
          this.setState({sellerName: this.state.serviceInfo[0].sellerName});
          this.setState({minPrice: this.state.serviceInfo[0].minPrice});
          this.setState({maxPrice: this.state.serviceInfo[0].maxPrice});
          this.setState({serviceCategory: this.state.serviceInfo[0].serviceCategory});
          this.setState({sellerCity: this.state.serviceInfo[0].city});

        } else {
          //navigate to Create Account
          alert("Something went wrong");

        }
      });
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  //navigate to purchase service screen
  purchaseService = () => {

    var serviceCategory = 'CheckoutService'+this.state.serviceCategory;
    // alert(serviceCategory);
    this.props.navigation.navigate(serviceCategory, {
      serviceInfo: this.state.serviceInfo
    });
  }

  //navigate to edit service screen
  editService = () => {


  }

  render() {
    const { navigation } = this.props;
    if (this.state.myServices) {
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
          <View style={{alignItems:'center'}}>
            <Text style={{textAlign:'center', fontSize:30, fontWeight:'bold'}}>{this.state.serviceName}</Text>
            <Text style={st.heading2}>{this.state.serviceDescription}</Text>
            <View style={{flexDirection:'row'}}>
              <Icon name="dollar" size={30} color='#E88D72'/>
              <Text style={{marginBottom:10, fontSize:20, marginLeft:10}}>{this.state.minPrice} - {this.state.maxPrice}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Icon2 name="map-marker-radius" size={30} color='#E88D72'  />
              <Text style={{marginBottom:10, fontSize:20, marginLeft:7}}>{this.state.sellerCity}</Text>
            </View>
          </View>

          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              style={st.btn}
              onPress={() => this.purchaseService()}
            >
              <Text style={st.btnText}>Order Service</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={st.btn}
              onPress={() => this.editService()}
            >
              <Text style={st.btnText}>Edit Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
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
          <View style={{alignItems:'center'}}>
            <Text style={{textAlign:'center', fontSize:30, fontWeight:'bold'}}>{this.state.serviceName}</Text>
            <Text style={st.heading2}>{this.state.serviceDescription}</Text>
            <View style={{flexDirection:'row'}}>
              <Icon name="dollar" size={30} color='#E88D72'/>
              <Text style={{marginBottom:10, fontSize:20, marginLeft:10}}>{this.state.minPrice} - {this.state.maxPrice}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Icon2 name="map-marker-radius" size={30} color='#E88D72'  />
              <Text style={{marginBottom:10, fontSize:20, marginLeft:7}}>{this.state.sellerCity}</Text>
            </View>
          </View>

          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              style={st.btn}
              onPress={() => this.purchaseService()}
            >
              <Text style={st.btnText}>Order Service</Text>
            </TouchableOpacity>

          </View>
        </View>
      );
    }
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default Service;
