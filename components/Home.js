import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import ServicePreview from "./ServicePreview.js";

class CreateAccount extends Component {
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

  render() {
    const { navigation } = this.props;
    const firstName = JSON.parse(
      JSON.stringify(navigation.getParam("firstName", "NO-NAME"))
    );
    const id = JSON.parse(JSON.stringify(navigation.getParam("id", "NO-NAME")));
    AsyncStorage.getItem("userId", (err, result) => {
      //alert(result);
    });
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={st.container}>
          <View
            style={{
              height: this.startHeaderHeight,
              backgroundColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "white",
                marginHorizontal: 20,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "black",
                shadowOpacity: 0.2,
                elevation: 1,
                marginTop: Platform.OS == "android" ? 25 : null
              }}
            >
              <Icon name="search" size={40} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="What are you looking for?"
                placeholderTextColor="lightgrey"
                style={{
                  flex: 1,
                  fontWeight: "300",
                  fontSize: 20,
                  backgroundColor: "white"
                }}
              />
            </View>
          </View>
          <Text style={st.heading2}> Welcome to Servus </Text>
          <ServicePreview navigation={navigation} />
        </View>
      </SafeAreaView>
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create({});
export default CreateAccount;
