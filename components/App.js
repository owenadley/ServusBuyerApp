import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import NavBar from './NavBar.js';
import Register from './Register.js'
import SignIn from './SignIn.js';
import Example from './Example.js';
import {createStackNavigator, createAppContainer} from 'react-navigation';


//type Props = {};
//export default class App extends Component<Props> {
//  render() {
//    return (
      /*<Example/>*/
//      <View style={{flex:1,flexDirection: 'column'}}>//
  //      <NavBar />
//        <Register />
//      </View>
//    );
  //}
//}




const RootStack = createStackNavigator(
  {
    SignIn: SignIn,
    Register: Register,
  },
  {
    initialRouteName: 'SignIn',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  headerTitle: {
    fontSize: 16,
    paddingLeft: 30,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
