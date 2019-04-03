import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Service from "./Service.js";
import StarRating from "react-native-star-rating";
import { TouchableOpacity } from "react-native-gesture-handler";

class ServiceCard extends Component {
  selectService = data => {
    if (data !== 0) {
      this.props.navigation.navigate("Service", {
        selectedService: data
      });
    }
  };
  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          borderRightColor: "#398FC7",
          borderRightWidth: 3,
          height: 200,
          width: 370,
          margin: 20,
          marginBottom: 10,
          borderRadius: 5
          // shadowColor: "#000",
          // shadowOffset: {
          //   width: 0,
          //   height: 4
          // },
          // shadowOpacity: 0.3,
          // shadowRadius: 4.65,
          // elevation: 8
        }}
      >
        <TouchableOpacity onPress={() => this.selectService(this.props.id)}>
          <View
            style={{
              overflow: "hidden",
              height: 200,
              width: 370,
              flexDirection: "row",
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "#dddddd"
            }}
          >
            <View style={{ flex: 4 }}>
              <Image
                source={require("../image/LawnMowing.jpg")}
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "cover"
                }}
              />
            </View>
            <View
              style={{
                flex: 7,
                margin: 5,
                marginBottom: 0,
                flexDirection: "column"
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row"
                  }}
                >
                  <Image
                    source={require("../image/avatar2.jpg")}
                    style={{
                      height: 35,
                      width: 35,
                      borderRadius: 60,
                      margin: 5
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      padding: 12,
                      paddingLeft: 3
                    }}
                  >
                    {this.props.sellerName}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={4.5}
                    starSize={16}
                    fullStarColor="orange"
                    emptyStarColor="orange"
                    style={{ padding: 8 }}
                  />
                </View>
              </View>
              <View style={{ flex: 2 }}>
                <Text
                  style={{
                    fontSize: 20,
                    overflow: "hidden",
                    textAlign: "center"
                  }}
                >
                  {this.props.serviceName}
                </Text>
                <Text style={{ fontSize: 15, overflow: "hidden" }}>
                  {this.props.serviceDescription}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  margin: 5,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    borderRadius: 25,
                    backgroundColor: "#E88D7275",
                    width: 75,
                    height: 35,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <Icon name="dollar" size={20} />
                  <Text
                    style={{
                      fontSize: 15
                    }}
                  >
                    {this.props.minPrice}-{this.props.maxPrice}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 25,
                    backgroundColor: "#E88D7275",
                    width: 75,
                    height: 35,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <Icon2 name="map-marker-radius" size={25} />
                  <Text
                    style={{
                      fontSize: 15,
                      color: "black"
                    }}
                  >
                    10 km
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const st = require("./style");
const styles = StyleSheet.create({});
export default ServiceCard;
