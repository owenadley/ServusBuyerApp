import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Example extends Component {
   state = {
      data: ''
   }
   componentDidMount = () => {
      fetch('http://localhost:8080/api/users', {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           username: 'owen',
           password: 'pass',
         }),

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
