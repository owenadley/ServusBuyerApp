import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Scroll, ScrollView, AsyncStorage} from 'react-native';

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
      serviceCategory: '',
      serviceDescription: '',
      sellerName: '',
      minPrice: 0,
      maxPrice: 0,
      proximity: 0,
      data: [
        {
             label: 'Lawn Mowing',
             size: 32,
             layout: 'row',
         },
         {
             label: 'Snow Removal',
             size: 32,
             layout: 'row',
         },
         {
             label: 'Cleaning',
             size: 32,
             layout: 'row',
         },

      ],
    }
  }

  becomeASeller = () => {
    //alert('here');
    AsyncStorage.getItem('userId', (err, result) => {
      let selectedButton = this.state.data.find(e => e.selected == true);
      selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
    //  alert(selectedButton);
      fetch('http://localhost:8080/api/postService', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            sellerId: result,
            sellerName: this.state.sellerName,
            serviceCategory: selectedButton,
            serviceName: this.state.serviceName,
            serviceDescription: this.state.serviceDescription,
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice,
         }),
        });
      //  alert("Your service has been created.");
        this.props.navigation.navigate('Home', {

        });

    });
  }

  // update state
  onPress = data => this.setState({ data });

  render() {
    const { navigation } = this.props;
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;

    return (
      <ScrollView>
          <Text style={st.heading1}>Sell A Service</Text>
          <Text style={st.heading2}>Please choose the service you wish to offer</Text>

          <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />


          <Input
              type="text"
              label='Seller Name'
              placeholder='Enter your seller or company name'
              onChangeText={(text) => this.setState({sellerName: text})}
              leftIcon={
                <Icon2
                  name='earth-outline'
                  size={24}
                  color='black'
                />
              }
            />
            <Input
                type="text"
                label='Service Name'
                placeholder='Enter the name of your service'
                onChangeText={(text) => this.setState({serviceName: text})}
                leftIcon={
                  <Icon2
                    name='earth-outline'
                    size={24}
                    color='black'
                  />
                }
              />
          <Input
              type="text"
              label='Proximity (km)'
              placeholder='How far are you willing to travel?'
              onChangeText={(text) => this.setState({proximity: text})}
              leftIcon={
                <Icon2
                  name='earth-outline'
                  size={24}
                  color='black'
                />
              }
            />
            <Input
                type="text"
                label='Minimum Price (CAD$)'
                placeholder='The cheapest you will offer your service for'
                onChangeText={(text) => this.setState({minPrice: text})}
                leftIcon={
                  <Icon2
                    name='currency-usd-outline'
                    size={24}
                    color='black'
                  />
                }
              />
              <Input
                  type="text"
                  label='Maximum Price (CAD$)'
                  placeholder='The largest job you are willing to take on'
                  onChangeText={(text) => this.setState({maxPrice: text})}
                  leftIcon={
                    <Icon2
                      name='currency-usd-outline'
                      size={24}
                      color='black'
                    />
                  }
                />
                <Input
                    type="text"
                    label='Decription'
                    placeholder='Give a description of what you are offering'
                    onChangeText={(text) => this.setState({serviceDescription: text})}
                    leftIcon={
                      <Icon2
                        name='note-text-outline'
                        size={24}
                        color='black'
                      />
                    }
                  />

          <Button
            raised
            buttonStyle={{backgroundColor: '#065535', borderRadius: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Continue`}
            onPress={ this.becomeASeller.bind() }
          />
      </ScrollView>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default BecomeASeller;
