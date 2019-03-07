import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Example extends Component {
   state = {
      data: ''
   }
   componentDidMount = () => {
      fetch('http://localhost:8080/api/users?username=tkang042&password=testing', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            data: responseJson
         })
      })
      .catch((error) => {
         console.error(error);
      });
   }
   render() {
      return (
         <View>
            <Text>
               {this.state.data.body}
            </Text>
         </View>
      )
   }
}
export default Example