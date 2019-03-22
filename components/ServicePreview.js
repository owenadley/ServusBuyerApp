import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';
import Service from './Service.js'

class ServicePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicePreviews: [],
      username: '',
      selectedService: 0
    }

  }


  componentDidMount() {
    fetch('http://localhost:8080/api/getServicePreviews')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        servicePreviews: responseJson.servicePreviews
      }, function(){
        if(this.state.servicePreviews){
          var serviceCount = Object.keys(this.state.servicePreviews);
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

  selectService = (data) => {
    if (data !== 0) {
      this.props.navigation.navigate('Service', {
        selectedService: data
      });
    }
  }

  servicePreviewList() {
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
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={st.container}>


            {this.servicePreviewList()}



      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default ServicePreview;
