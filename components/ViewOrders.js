import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, AsyncStorage, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';


class ViewOrders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      servicesOrdered: []
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userId', (err, result) => {

      fetch('http://localhost:8080/api/getMyOrders/?id=' + result)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          servicesOrdered: responseJson.orders
        });
      })
      .catch((error) =>{
        console.error(error);
      });

    });
  }



  render() {
    const { navigation } = this.props;
    var style;
    alert(this.state.servicesOrdered[0][0].sellerName);
    return (
      <View style={st.container}>
          <Text style={st.heading1}>Active Orders</Text>
          <Text style={st.heading2}>{this.state.servicesOrdered[0][0].sellerName} </Text>
          <Text style={st.heading1}>Past Orders</Text>
      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default ViewOrders;
