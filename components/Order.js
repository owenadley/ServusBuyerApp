import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import Timeline from "react-native-timeline-listview";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Input, Card } from "react-native-elements";
import { StripeAddCard } from "react-native-checkout";
import NavigationService from "./NavigationService.js";
import StarRating from "react-native-star-rating";
import Moment from "moment";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellerName: "",
      serviceCategory: "",
      price: 0,
      dateOrdered: "",
      progressData: this.data,
      orderId: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const orderId = JSON.parse(
      JSON.stringify(navigation.getParam("selectedOrder", "NO-NAME"))
    );
    AsyncStorage.getItem("userId", (err, result) => {
      fetch("http://localhost:8080/api/viewOrder/?id=" + orderId)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            sellerName: responseJson.order[0].sellerName,
            serviceCategory: responseJson.order[0].serviceCategory,
            price: responseJson.order[0].price,
            dateOrdered: responseJson.order[0].dateOrdered,
            orderId: responseJson.order[0].id
          });
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  cancelOrder = orderId => {
    if (orderId !== 0) {
      this.props.navigation.navigate("CancelOrder", {
        orderId: orderId
      });
    }
  };

  render() {
    const { navigation } = this.props;
    Moment.locale("en");

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20
          }}
        >
          <Image
            source={require("../image/LawnMowing.jpg")}
            style={{
              width: 110,
              height: 110,
              borderRadius: 55
            }}
          />
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              paddingHorizontal: 20,
              marginTop: 5,
              marginBottom: 5,
              textAlign: "center",
              color: "#000"
            }}
          >
            {this.state.sellerName}
          </Text>

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

        <View
          style={{
            borderBottomColor: "#E88D72",
            borderBottomWidth: 2,
            marginTop: 20,
            marginBottom: 35
          }}
        />

        <View
          style={{
            alignItems: "flex-start",
            marginLeft: 65
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20
            }}
          >
            <Icon name="gears" size={35} color="#E88D72" />

            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  textAlign: "left",
                  marginLeft: 15,
                  fontWeight: "bold",
                  color: "#000",
                  fontSize: 15
                }}
              >
                Type
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "300",
                  paddingHorizontal: 20,
                  marginTop: 0,
                  textAlign: "center"
                }}
              >
                {this.state.serviceCategory + " Services"}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20
            }}
          >
            <Icon name="calendar" size={35} color="#E88D72" />

            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  textAlign: "left",
                  marginLeft: 15,
                  fontWeight: "bold",
                  color: "#000",
                  fontSize: 15
                }}
              >
                Date
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "300",
                  paddingHorizontal: 20,
                  marginTop: 0,
                  textAlign: "center"
                }}
              >
                {Moment(this.state.dateOrdered).format("MMMM Do YYYY, h:mm a")}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20
            }}
          >
            <Icon name="dollar" size={35} color="#E88D72" />

            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  textAlign: "left",
                  marginLeft: 15,
                  fontWeight: "bold",
                  color: "#000",
                  fontSize: 15
                }}
              >
                Price
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "300",
                  paddingHorizontal: 20,

                  marginTop: 0,
                  textAlign: "center"
                }}
              >
                {"$" + this.state.price + " CAD (HST included)"}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={st.btn}>
            <Text style={st.btnText}>Message Seller</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={st.btn}
            onPress={() => this.cancelOrder(this.state.orderId)}
          >
            <Text style={st.btnText}>Cancel Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create({});
export default Order;
