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

import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements';

//const SignInForm = tc.form.Form;

//type Props = {};
class SignIn extends Component {
  render() {
    return (
  //    <View style={styles.formWrap}>
    //    <Text>Sign In - test</Text>
    //  <FormLabel> Name </FormLabel>
        //<FormInput />
    //    <FormValidationMessage>Error message</FormValidationMessage>
  //    </View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task It</Text>
      </View>
    );
  }
}


//const User = tc.struct({
//  email: tc.String,
//  username: tc.String,
//  password: tc.String,
//});

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
    paddingLeft: 30,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
  },
});

export default SignIn;
