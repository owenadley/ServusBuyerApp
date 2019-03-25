import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from "react-native";
import {
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  SafeAreaView,
  DrawerItems
} from "react-navigation";

import NavigationService from "./NavigationService.js";
import Register from "./Register.js";
import ContinueWithPassword from "./ContinueWithPassword.js";
import CreateAccount from "./CreateAccount.js";
import Home from "./Home.js";
import Service from "./Service.js";
import ServicePreview from "./ServicePreview.js";
import ViewAccount from "./ViewAccount.js";
import BecomeASeller from "./BecomeASeller.js";
import AuthLoadingScreen from "./AuthLoadingScreen.js";
import MyServices from "./MyServices.js";
import PurchaseService from './PurchaseService.js';
import AddNewCard from './AddNewCard.js';
import ConfirmPurchase from './ConfirmPurchase.js';

class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  signOut = () => {
    this.props.navigationProps.navigate("Auth");
  };

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require("../image/drawer.png")}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const DrawerNavigatorExample = createDrawerNavigator(
  {
    //Drawer Optons and indexing

    Home: {
      screen: Home,
      navigationOptions: {
        drawerLabel: "Home"
      }
    },
    ViewAccount: {
      screen: ViewAccount,
      navigationOptions: {
        drawerLabel: "My Account"
      }
    },
    MyServices: {
      screen: MyServices,
      navigationOptions: {
        drawerLabel: "My Services"
      }
    }
  },
  {
    contentComponent: props => (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          <DrawerItems {...props} />

          <Button
            title="Sign Out"
            onPress={async () => {
              try {
                AsyncStorage.clear();
                NavigationService.navigate("Auth");
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </SafeAreaView>
      </View>
    )
  }
);

const AuthStack = createStackNavigator({
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  ContinueWithPassword: {
    screen: ContinueWithPassword,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  }
});

const AppStack = createStackNavigator({
  Home: {
    screen: DrawerNavigatorExample,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  Service: {
    screen: Service,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  ViewAccount: {
    screen: ViewAccount,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  BecomeASeller: {
    screen: BecomeASeller,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  PurchaseService: {
    screen: PurchaseService,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  AddNewCard: {
    screen: AddNewCard,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  ConfirmPurchase: {
    screen: ConfirmPurchase,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  }
});

const switchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppContainer = createAppContainer(switchNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
