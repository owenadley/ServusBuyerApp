import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Register from './Register.js';
import ContinueWithPassword from './ContinueWithPassword.js';
import CreateAccount from './CreateAccount.js';
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



// root stack defining screens in navigation stack
const RootStack = createStackNavigator(
  {
    Register: {screen: Register},
    ContinueWithPassword: {screen: ContinueWithPassword},
    CreateAccount: {screen: CreateAccount},
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
