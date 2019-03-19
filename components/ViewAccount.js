import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';

class ViewAccount extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     serviceInfo: [],
  //     serviceName: '',
  //     serviceDescription: '',
  //     sellerName: '',
  //     minPrice: 0,
  //     maxPrice: 0,
  //   }
  //}


  becomeASeller = () => {
    this.props.navigation.navigate('BecomeASeller', {
    //  firstName: this.state.firstName,
    //  email: this.state.email
    })
  }



  render() {
    const { navigation } = this.props;

    return (
      <View style={st.container}>
          <Text style={st.heading1}>Your Account</Text>
          <Button
          raised
          buttonStyle={{backgroundColor: '#065535', borderRadius: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Sell A Service`}
          onPress={this.becomeASeller.bind()}
          />
      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default ViewAccount;
