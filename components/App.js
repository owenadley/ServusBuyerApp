import React, { Component } from "react";
import {
  View,
  Image,
  Button,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text
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
import SellAService from "./SellAService.js";
import AuthLoadingScreen from "./AuthLoadingScreen.js";
import MyServices from "./MyServices.js";
import PurchaseService from "./PurchaseService.js";
import AddNewCard from "./AddNewCard.js";
import ConfirmPurchase from "./ConfirmPurchase.js";
import PaymentInfo from "./PaymentInfo.js";
import CreateLocation from "./CreateLocation.js";
import BecomeASeller from "./BecomeASeller.js";
import CheckoutServiceLawnMowing from "./CheckoutServiceLawnMowing.js";
import ServiceOrdered from "./ServiceOrdered.js";
import ViewOrders from "./ViewOrders.js";
import EditLoginSecurity from "./editLoginSecurity";
import Order from './Order.js';
import CancelOrder from './CancelOrder.js';
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
            style={{ width: 35, height: 35, marginLeft: 8 }}
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
    },
    ViewOrders: {
      screen: ViewOrders,
      navigationOptions: {
        drawerLabel: "My Orders"
      }
    }
  },
  {
    contentComponent: props => (
      <SafeAreaView
        style={{ flex: 1 }}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View
          style={{
            height: 150,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            source={require("../image/avatar1.jpg")}
            style={{ height: 120, width: 120, borderRadius: 60 }}
          />
        </View>
        <ScrollView>
          <DrawerItems {...props} />
        </ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20
          }}
        >
          <TouchableOpacity
            style={st.btnSignOut}
            onPress={async () => {
              try {
                AsyncStorage.clear();
                NavigationService.navigate("Auth");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Text style={st.btnText}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    ),
    contentOptions: { activeTintColor: "#E88D72" }
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
  },
  CreateLocation: {
    screen: CreateLocation,
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
  ServicePreview: {
    screen: ServicePreview,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
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
  SellAService: {
    screen: SellAService,
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
  },
  PaymentInfo: {
    screen: PaymentInfo,
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
  CheckoutServiceLawnMowing: {
    screen: CheckoutServiceLawnMowing,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  ServiceOrdered: {
    screen: ServiceOrdered,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  EditLoginSecurity: {
    screen: EditLoginSecurity,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  ViewOrders: {
    screen: ViewOrders,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  Order: {
    screen: Order,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
  CancelOrder: {
    screen: CancelOrder,
    navigationOptions: ({ navigation }) => ({
      title: "Servus",
      //headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      headerTintColor: "#000000"
    })
  },
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

const st = require("./style");
const styles = StyleSheet.create({});
