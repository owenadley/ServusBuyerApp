import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  LayoutAnimation,
  Animated,
  UIManager
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/AntDesign";
import { Button } from "react-native-elements";
import ImagePicker from "react-native-image-picker";

const { width: WIDTH } = Dimensions.get("window");

class ViewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      expanded: false,
      animation: new Animated.Value()
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  toggle() {
    let initialValue = this.state.expanded
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start();
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  createFormData = (photo, body) => {
    const data = new FormData();

    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  handleUploadPhoto = () => {
    fetch("http://localhost:8080/api/uploadImage", {
      method: "POST",
      body: this.createFormData(this.state.photo, { userId: 52 })
    })
      .then(response => response.json())
      .then(response => {
        alert("Upload success!");
        this.setState({ photo: null });
      })
      .catch(error => {
        alert("Upload failed!");
      });
  };

  paymentInfo = () => {
    this.props.navigation.navigate("PaymentInfo");
  };
  editLoginSecurity = () => {
    this.props.navigation.navigate("EditLoginSecurity");
  };

  render() {
    const { photo } = this.state;
    return (
      <ScrollView
        style={{ backgroundColor: "#4E1A3D", flex: 1, flexDirection: "column" }}
      >
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 100, height: 100 }}
          />
        )}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 40
          }}
        >
          <View
            style={{
              height: 180,
              width: 180,
              borderRadius: 90,
              backgroundColor: "#CFEED1",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              source={require("../image/avatar1.jpg")}
              style={{ height: 150, width: 150, borderRadius: 75 }}
            />
          </View>
        </View>
        <View
          style={{
            padding: 40,
            paddingBottom: 5,
            flex: 2,
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: WIDTH - 100,
              height: 100,
              backgroundColor: "rgba(0,0,0,0.40)",
              marginBottom: 10
            }}
          >
            <TouchableOpacity
              onPress={this.changeLayout}
              style={{
                width: WIDTH - 100,
                height: 100
              }}
            >
              <Text style={styles.heading}>Services</Text>
            </TouchableOpacity>
            <View
              style={{
                height: this.state.expanded ? null : 0,
                overflow: "hidden",
                backgroundColor: "rgba(0,0,0,0.25)"
              }}
            >
              <TouchableOpacity
                style={{
                  width: WIDTH - 100,
                  height: 50
                }}
              >
                <Text style={styles.subHeading}>Your one-time services</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: WIDTH - 100,
                  height: 50
                }}
              >
                <Text style={styles.subHeading}>Your contracts</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: WIDTH - 100,
              height: 100,
              backgroundColor: "rgba(0,0,0,0.40)",
              marginVertical: 10
            }}
          >
            <Text style={styles.heading}>Services</Text>
          </View>

          <View
            style={{
              width: WIDTH - 100,
              height: 100,
              backgroundColor: "rgba(0,0,0,0.40)"
            }}
          >
            <Text style={styles.heading}>Services</Text>
          </View>

          {/* 
          <Text style={styles.heading}>Account Settings</Text>
          <TouchableOpacity onPress={() => this.editLoginSecurity()}>
            <Text style={styles.subHeading}>Login & Security</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.paymentInfo()}>
            <Text style={styles.subHeading}>Manage payment options</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.subHeading}>Your profile</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.subHeading}>Your addresses</Text>
          </TouchableOpacity> */}

          {/* <Button
            title="Choose Photo"
            onPress={() => this.handleChoosePhoto()}
          />
          <Button
            title="Upload Photo"
            onPress={() => this.handleUploadPhoto()}
          /> */}
        </View>
      </ScrollView>
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create({
  heading: {
    fontFamily: "Arial",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "left",
    color: "#000000",
    margin: 10
  },
  subHeading: {
    fontFamily: "Arial",
    fontSize: 15,
    textAlign: "left",
    color: "#000000",
    paddingLeft: 20,
    paddingBottom: 5
  },
  subContainer: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white"
  }
});
export default ViewAccount;
