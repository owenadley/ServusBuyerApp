import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Example extends Component {
   state = {
      data: ''
   }

   componentDidMount(){
      fetch('http://localhost:8080/api/postUsers', {
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
      
      fetch('http://localhost:8080/api/getUsers')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            data: responseJson.password
          }, function(){
  
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });
    }

   render() {
      return (
         <View>
            <Text>
               {this.state.data}
            </Text>
         </View>
      )
   }
}
export default Example
