import React, { Component } from "react";
import {
  StyleSheet,
  AsyncStorage,
  Platform,
  StatusBar,
} from "react-native";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: ""
    };
  }

  componentWillMount() {
    this.startHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  selectServiceCategory = () => {
    this.props.navigation.navigate("ServicePreview");
  };

  render() {
    const { navigation } = this.props;
    const firstName = JSON.parse(
      JSON.stringify(navigation.getParam("firstName", "NO-NAME"))
    );
    const id = JSON.parse(JSON.stringify(navigation.getParam("id", "NO-NAME")));
    AsyncStorage.getItem("userId", (err, result) => {
    });

    return (
      <HomeView 
        navigation={navigation}
        selectServiceCategory = {() => this.props.selectServiceCategory()}
      />
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create({});
export default Home;
