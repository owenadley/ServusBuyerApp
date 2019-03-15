import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
    }
  }

   createAccount = () => {
    const email = this.props.navigation.getParam("email", "NO-EMAIL")
    fetch('http://localhost:8080/api/postUsers', {
       method: 'POST',
       headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
       },
       body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email: email,
          type: this.state.type
       }),
      });

      fetch('http://localhost:8080/api/getEmailExists/?email=' + email)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          accountExists: responseJson.accountExists,
          firstName: responseJson.firstName
        }, function(){
          if(this.state.accountExists){
            this.props.navigation.navigate('Home', {
              firstName: this.state.firstName,
              email: this.state.email
            })
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

  render() {
    const { navigation } = this.props;
    return (
      <View style={st.container}>
        <Text style={st.heading2}> Please enter a password </Text>

        <Input
          type="text"
          placeholder='Username'
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />
          }
        />

          <Input
            type="text"
            placeholder='Password'
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='black'
              />
            }
          />
        <Button
          raised
          buttonStyle={{backgroundColor: '#065535', borderRadius: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Create Account`}
          onPress={ this.createAccount.bind() }
        />

      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default CreateAccount;
