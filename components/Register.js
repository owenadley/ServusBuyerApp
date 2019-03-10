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
    }
    this.publish = this.publish.bind(this);
  }

  static navigationOptions = {
    title: 'Servus',
  };

   componentDidMount(){
     //this.publish();
   }
   publish = () => {
    fetch('http://localhost:8080/api/postUsers', {
       method: 'POST',
       headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
       },
       body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          type: this.state.type
       }),

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
          title={`Continue`}
          onPress={ this.publish }
        />



      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default Register;
