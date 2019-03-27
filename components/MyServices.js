import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, AsyncStorage, RefreshControl} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';

class MyServices extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serviceInfo: [],
      serviceName: '',
      serviceDescription: '',
      sellerName: '',
      minPrice: 0,
      maxPrice: 0,
      servicePreviews: [],
      serviceExists: 0,
      refreshing: false
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    AsyncStorage.getItem('userId', (err, result) => {

      fetch('http://localhost:8080/api/getSellerName/?id=' + result)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.sellerName == null) {
          this.setState({
            sellerName: null,
          });
        } else {
          this.setState({
            sellerName: responseJson.sellerName,
          });
        }
      })
      .catch((error) =>{
        console.error(error);
      });

    });
  }

  sellAService = () => {
    this.props.navigation.navigate('SellAService', {
    //  firstName: this.state.firstName,
    //  email: this.state.email
    })
  }

  becomeASeller = () => {
    this.props.navigation.navigate('BecomeASeller', {
    //  firstName: this.state.firstName,
    //  email: this.state.email
    })
  }

  selectService = (data) => {
    if (data !== 0) {
      this.props.navigation.navigate('Service', {
        selectedService: data
      });
    }
  }

  servicePreviewList() {
    if(this.state.serviceExists) {

      return this.state.servicePreviews.map((data) => {
        return (
          <Card>
            <Text style={{fontSize: 30}}>{data.serviceName}</Text>
            <Text style={{marginBottom: 10}}>
               {data.serviceDescription}
            </Text>
            <Button
              icon={<Icon name='code' color='#ffffff' />}
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='VIEW NOW'
              onPress={() => this.selectService(data.id)} />
          </Card>
        )
      })

    } else {
      return (
        <View><Text style={st.heading2}>You have no active services</Text></View>
      )
    }
  }


  render() {
    const { navigation } = this.props;

    if (this.state.sellerName !== null) {
      return (
        <View style={st.container}>
            <Text style={st.heading1}>{this.state.sellerName}</Text>
            <Button
            raised
            buttonStyle={{backgroundColor: '#065535', borderRadius: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Sell A Service`}
            onPress={this.sellAService.bind()}
            />
            {this.servicePreviewList()}
        </View>
      );
    } else {
      if (this.props.navigation.getParam("sellerName")) { this.fetchData(); }
      return (
          <View style={st.container}>
              <Text style={st.heading2}>You have not registered as a seller, yet..</Text>
              <Button
              raised
              buttonStyle={{backgroundColor: '#065535', borderRadius: 10}}
              textStyle={{textAlign: 'center'}}
              title={`Become A Seller`}
              onPress={this.becomeASeller.bind()}
              />
          </View>
        );
    }
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default MyServices;
