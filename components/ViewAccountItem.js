import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  UIManager,
  Image
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width: WIDTH } = Dimensions.get("window");

class ViewAccountItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
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

  render() {
    const { photo } = this.state;
    return (
      <Animated.View
        style={{
          width: WIDTH - 100,
          marginBottom: 10,
          overflow: "hidden"
        }}
      >
        <View
          style={{ backgroundColor: "rgba(0,0,0,0.40)", paddingLeft: 5 }}
          onLayout={this._setMinHeight.bind(this)}
        >
          <TouchableOpacity
            onPress={this.toggle.bind(this)}
            style={{
              width: WIDTH - 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={this.props.imageUri}
                style={{
                  flex: 1,
                  resizeMode: "center",
                  tintColor: "#FFE9E4",
                  width: 55,
                  height: 55
                }}
              />
              <Text
                style={{
                  color: "#FFE9E4",
                  fontSize: 26,
                  flex: 3,
                  paddingLeft: 10
                }}
              >
                {this.state.title}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: this.state.expanded ? null : 0,
            overflow: "hidden",
            backgroundColor: "rgba(0,0,0,0.30)"
          }}
          onLayout={this._setMaxHeight.bind(this)}
        >
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

const st = require("./style");
const styles = StyleSheet.create();
export default ViewAccountItem;
