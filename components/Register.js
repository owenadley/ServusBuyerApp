import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';
//const SignInForm = tc.form.Form;

//type Props = {};
class Register extends Component {
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
            placeholder='E-mail'
            leftIcon={
              <Icon2
                name='email-outline'
                size={24}
                color='black'
              />
            }
          />

          <Input
            placeholder='Password'
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
        />
        


      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default Register;
