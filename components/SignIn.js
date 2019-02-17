import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Input} from 'react-native-elements';
//const SignInForm = tc.form.Form;

//type Props = {};
class SignIn extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={st.container}>
        <View>
          <Text style={st.heading1}>Sign in</Text>
          <Input
            placeholder='you@example.com'
            label='Email'
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='black'
              />
            }
          />

          <Input
            placeholder='*******'
            label='Password'
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='black'
              />
            }
          />

        </View>
        <Button
          raised
          icon={{name: 'home', size: 32}}
          buttonStyle={{backgroundColor: '#5eb9ff', borderRadius: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Sign in`}
        />
      </View>
    );
  }
}

const st = require('./style');

export default SignIn;
