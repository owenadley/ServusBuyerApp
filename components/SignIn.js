/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Input} from 'react-native-elements';
//const SignInForm = tc.form.Form;

//type Props = {};
class SignIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.signin}>

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
            placeholder='abc'
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
          buttonStyle={{backgroundColor: '#ff4f00', borderRadius: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Submit`}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    //alignItems: 'stretch',
    backgroundColor: 'white',
    padding: 10,
  },
  signin: {
    backgroundColor: '#f5f6fa',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
  }
});

export default SignIn;
