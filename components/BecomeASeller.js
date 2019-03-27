import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';

class BecomeASeller extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sellerName: null
    }
  }

  componentDidMount() {

  }

  registerSeller = () => {
    //submit a new seller name to user
    AsyncStorage.getItem('userId', (err, result) => {

    //  alert(selectedButton);
      fetch('http://localhost:8080/api/addSellerName/?id=' + result + '&sellerName=' + this.state.sellerName, {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         }
        });

        this.props.navigation.navigate('MyServices', {
          sellerName: this.state.sellerName
        });

    });
  }


  render() {
    const { navigation } = this.props;

    return (
      <View style={st.container}>
          <Text style={st.heading1}>Create Seller Profile</Text>

          <Input placeholder='Name' label='Your Seller Name' onChangeText={(text) => this.setState({sellerName: text})}/>

          <Button title='Submit' onPress={() => this.registerSeller()}/>
      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default BecomeASeller;
