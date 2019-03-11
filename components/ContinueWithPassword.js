import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';

class ContinueWithPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    }
  }

  static navigationOptions = {
    title: 'Servus',
  };

  signIn = () => {
    const email = this.props.navigation.getParam("email", "NO-EMAIL")
    fetch('http://localhost:8080/api/signIn/?email=' + email + '&password=' + this.state.password)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        accountExists: responseJson.accountExists,
        type: responseJson.type,
        firstName: responseJson.firstName
      }, function(){
        if(this.state.accountExists){
          this.props.navigation.navigate('Home', {
            firstName: this.state.firstName,
            email: this.state.email
          })
        } else {
          alert("Account not found!")
        }
      });
    })
    .catch((error) =>{
      console.error(error);
    });
   }


  render() {
    const { navigation } = this.props;
   const firstName = JSON.parse(JSON.stringify(navigation.getParam('firstName', 'NO-NAME')));
    return (
      <View style={st.container}>
        <Text style={st.heading1}> Hi, {firstName} </Text>
        <Text style={st.heading2}> To continue, please verify it's you </Text>

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
          title={`Sign in`}
          onPress={ this.signIn.bind() }
        />

      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
});
export default ContinueWithPassword;
