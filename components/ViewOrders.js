import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, AsyncStorage, TextInput, ScrollView} from 'react-native';

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


  getOrders() {
    return this.state.servicesOrdered.map(data => {
      return (
        <Card style={{ height: 30, width: 30 }}>
          <Text style={{ fontSize: 30 }}>{data.sellerName}</Text>
          <Text style={{ marginBottom: 10 }}>{data.serviceCategory}</Text>
          <Button
            icon={<Icon name="code" color="#ffffff" />}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="VIEW NOW"
          />
        </Card>
      );
    });
  }

  render() {
    const { navigation } = this.props;
    var style;

    return (
      <ScrollView>
          <Text style={st.heading1}>Active Orders</Text>
          {this.getOrders()}
          <Text style={st.heading1}>Past Orders</Text>
      </ScrollView>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default ViewOrders;
