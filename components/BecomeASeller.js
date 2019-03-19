import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';
import RadioGroup from 'react-native-radio-buttons-group';


class BecomeASeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceInfo: [],
      serviceName: '',
      serviceDescription: '',
      sellerName: '',
      minPrice: 0,
      maxPrice: 0,
      data: [
        {
             label: 'Lawn Mowing',
             value: 'LAWNMOW',
             size: 32,
             layout: 'row',
         },
         {
             label: 'Snow Removal',
             value: "SNOWREMO",
             size: 32,
             layout: 'row',
         },
         {
             label: 'Cleaning Services',
             value: 'CLEAN',
             size: 32,
             layout: 'row',
         },

      ],
    }
  }

  // update state
  onPress = data => this.setState({ data });

  render() {
    const { navigation } = this.props;
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;

    return (
      <View style={st.container}>
          <Text style={st.heading1}>Become A Seller</Text>
          <Text style={st.heading2}>Please choose the service you wish to offer</Text>

          <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />

          

          <Button
            raised
            buttonStyle={{backgroundColor: '#065535', borderRadius: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Continue`}

          />
      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default BecomeASeller;
