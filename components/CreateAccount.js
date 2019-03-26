import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Input} from 'react-native-elements';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    const email = this.props.navigation.getParam("email", "NO-EMAIL")
    this.state = {
      email: email,
      name: '',
      password: '',
      type: 0,
    }
  }

   createAccount = () => {
    fetch('http://localhost:8080/api/createUser/?email=' + this.state.email + '&name=' + this.state.name + '&password=' + this.state.password + '&type=' + this.state.type.toString())
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        userId: responseJson.userId,
      }, function(){
        AsyncStorage.setItem('userId', ''+this.state.userId);
        this.props.navigation.navigate('CreateLocation')  
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
        <Text style={st.heading1}> Create account </Text>

        <Input
          type="text"
          placeholder='Email'
          value={this.state.email}
          onChangeText={(text) => this.setState({email: text})}
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
          placeholder='Your name'
          value={this.state.name}
          onChangeText={(text) => this.setState({name: text})}
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
