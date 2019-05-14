import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-picker";
import ViewAccountItem from "./ViewAccountItem";

const { width: WIDTH } = Dimensions.get("window");

class ViewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null
    };
  }

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
        style={{
          backgroundColor: "rgba(102,0,51,.95)",
          flex: 1,
          flexDirection: "column"
        }}
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
        <ScrollView
          style={{
            padding: 40,
            paddingBottom: 5,
            flex: 2,
            paddingLeft: 50
          }}
        >
          <ViewAccountItem
            imageUri={require("../image/icon-service.png")}
            title="Services"
          >
            <TouchableOpacity
              style={{
                width: WIDTH - 100,
                height: 50,
                borderBottomColor: "rgba(102,0,51,.95)",
                borderBottomWidth: 1
              }}
            >
              <Text style={{ color: "#FFE9E4", fontSize: 18, padding: 10 }}>
                Your one-time services
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: WIDTH - 100,
                height: 50,
                borderTopColor: "rgba(102,0,51,.95)",
                borderTopWidth: 1
              }}
            >
              <Text style={{ color: "#FFE9E4", fontSize: 18, padding: 10 }}>
                Your contracts
              </Text>
            </TouchableOpacity>
          </ViewAccountItem>

          <ViewAccountItem
            imageUri={require("../image/settings.png")}
            title="Account Settings"
          >
            <TouchableOpacity
              onPress={() => this.editLoginSecurity()}
              style={{
                width: WIDTH - 100,
                height: 50,
                borderBottomColor: "rgba(102,0,51,.95)",
                borderBottomWidth: 1
              }}
            >
              <Text style={{ color: "#FFE9E4", fontSize: 18, padding: 10 }}>
                Login and Security
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.paymentInfo()}
              style={{
                width: WIDTH - 100,
                height: 50,
                borderTopColor: "rgba(102,0,51,.95)",
                borderTopWidth: 1
              }}
            >
              <Text style={{ color: "#FFE9E4", fontSize: 18, padding: 10 }}>
                Manage payment options
              </Text>
            </TouchableOpacity>
          </ViewAccountItem>

          <ViewAccountItem
            imageUri={require("../image/upload.png")}
            title="Upload Image"
          >
            <TouchableOpacity
              onPress={() => this.handleChoosePhoto()}
              style={{
                width: WIDTH - 100,
                height: 50,
                borderBottomColor: "rgba(102,0,51,.95)",
                borderBottomWidth: 1
              }}
            >
              <Text style={{ color: "#FFE9E4", fontSize: 18, padding: 10 }}>
                Choose Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleUploadPhoto()}
              style={{
                width: WIDTH - 100,
                height: 50,
                borderTopColor: "rgba(102,0,51,.95)",
                borderTopWidth: 1
              }}
            >
              <Text style={{ color: "#FFE9E4", fontSize: 18, padding: 10 }}>
                Upload Photo
              </Text>
            </TouchableOpacity>
          </ViewAccountItem>
        </ScrollView>
      </ScrollView>
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create();
export default ViewAccount;
