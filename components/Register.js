import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';
//const SignInForm = tc.form.Form;

//type Props = {};
class Register extends Component {
  constructor() {
    super();
    this.state = {
     username: '',
     password: '',
     email: '',
     type: 0,
     accountExists: '',
     firstName: '',
    }
  }

  static navigationOptions = {
    title: 'Servus',
  };

   continueWithEmail = () => {
    fetch('http://localhost:8080/api/getEmailExists/?email=' + this.state.email)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        accountExists: responseJson.accountExists,
        firstName: responseJson.firstName
      }, function(){
        if(this.state.accountExists){
          this.props.navigation.navigate('ContinueWithPassword', {
            firstName: this.state.firstName,
            email: this.state.email
          })
        } else {
          //navigate to Create Account
          this.props.navigation.navigate('CreateAccount', {
            firstName: this.state.firstName,
            email: this.state.email
          })

        }
      });
    })
    .catch((error) =>{
      console.error(error);
    });
   }




  render() {
    return (
      <View style={st.container}>
        <Text style={st.heading1}> Create Account </Text>
        <Icon.Button name="facebook" backgroundColor="#3b5998" solid>
            <Text style={st.bodyWhite}>
                Continue with Facebook
            </Text>
        </Icon.Button>
        <Icon.Button name="google" color="#000000" backgroundColor="#ffffff">
            <Text style={st.bodyBlack}>
                Continue with Google
            </Text>
        </Icon.Button>

        <View style={st.horizontalBorder}></View>

        <Text style={st.heading2}> Or continue with E-mail </Text>
        <Input
            type="text"
            placeholder='E-mail'
            onChangeText={(text) => this.setState({email: text})}
            leftIcon={
              <Icon2
                name='email-outline'
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
          onPress={ this.continueWithEmail.bind() }
        />



      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default Register;
