import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, AsyncStorage, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input, Card} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';


class ViewAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      edit: false,
      photo: null
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userId', (err, result) => {

      fetch('http://localhost:8080/api/getAccountInfo/?id=' + result)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          name: responseJson.name,
          email: responseJson.email,
          password: responseJson.password,
        });
      })
      .catch((error) =>{
        console.error(error);
      });

    });
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })


      }
    })
  }

  editAccountInfo = () => {
    var style;
    this.setState({
      edit: true,
    });
  }

  paymentInfo = () => {
    this.props.navigation.navigate('PaymentInfo');
  }

  render() {
    const { navigation } = this.props;
    var style;

    if (this.state.edit) {
      style = {
        display: 'none'
      }
    } else {
      style = {
        display: 'flex'
      }
    }

    const { photo } = this.state;
    return (
      <View style={st.container}>
          <Text style={st.heading1}>Your Account</Text>
          <Text style={st.heading2}>{this.state.name}</Text>
          <Input style={style}></Input>
          <Text style={st.heading2}>{this.state.email}</Text>
          <Input style={style}></Input>
          <Button title='Edit Info' onPress={() => this.editAccountInfo()}/>
          <Button title='Payment Info' onPress={() => this.paymentInfo()}/>

          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
          )}
          <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default ViewAccount;
