import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

import Register from './Register.js';
import ContinueWithPassword from './ContinueWithPassword.js';
import CreateAccount from './CreateAccount.js';
import Home from './Home.js';
import Service from './Service.js';
import ServicePreview from './ServicePreview.js';


class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>

          <Image
            source={require('../image/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />

        </TouchableOpacity>
      </View>
    );
  }
}

const Register_StackNavigator = createStackNavigator({
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      title: 'Servus',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
    }),
  },
});

const ContinueWithPassword_StackNavigator = createStackNavigator({
  ContinueWithPassword: {
    screen: ContinueWithPassword,
    navigationOptions: ({ navigation }) => ({
      title: 'Servus',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
    }),
  },
});

const CreateAccount_StackNavigator = createStackNavigator({
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions: ({ navigation }) => ({
      title: 'Servus',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
    }),
  },
});

const Home_StackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Servus',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
    }),
  },
});

const Service_StackNavigator = createStackNavigator({
  Service: {
    screen: Service,
    navigationOptions: ({ navigation }) => ({
      title: 'Servus',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
    }),
  },
});

const DrawerNavigatorExample = createDrawerNavigator({
  //Drawer Optons and indexing
  Register: {
    screen: Register_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Go to Register',
    },
  },
  ContinueWithPassword: {
    screen: ContinueWithPassword_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Go to log in',
    },
  },
  CreateAccount: {
    screen: CreateAccount_StackNavigator,
    navigationOptions: {
      drawerLabel: 'CreateAccount',
    },
  },
  Home: {
    screen: Home_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  Service: {
    screen: Service_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Service',
    },
  },
});

export default createAppContainer(DrawerNavigatorExample);
