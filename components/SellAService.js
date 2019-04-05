import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Scroll,
  ScrollView,
  TextInput,
  AsyncStorage,
  Dimensions,
  Picker
} from "react-native";

import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/FontAwesome";
import { Slider } from "react-native-elements";
import RadioGroup from "react-native-radio-buttons-group";
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";
import StepIndicator from "react-native-step-indicator";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-navigation";
import { Dropdown } from "react-native-material-dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: WIDTH } = Dimensions.get("window");
class SellAService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceInfo: [],
      serviceName: "",
      serviceCategory: "",
      serviceDescription: "",
      sellerName: "",
      minPrice: 0,
      maxPrice: 0,
      proximity: 1,
      data: [
        {
          value: "LawnMowing"
        },
        {
          value: "SnowRemoval"
        },
        {
          value: "Cleaning"
        },
        {
          value: "Handyman"
        }
      ]
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userId", (err, result) => {
      fetch("http://localhost:8080/api/getSellerName/?id=" + result)
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            sellerName: responseJson.sellerName
          });
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  becomeASeller = () => {
    //alert('here');
    AsyncStorage.getItem("userId", (err, result) => {
      let selectedButton = this.state.data.find(e => e.selected == true);
      selectedButton = selectedButton
        ? selectedButton.value
        : this.state.data[0].label;
      //  alert(selectedButton);
      fetch("http://localhost:8080/api/postService", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sellerId: result,
          sellerName: this.state.sellerName,
          serviceCategory: this.state.serviceCategory,
          serviceName: this.state.serviceName,
          serviceDescription: this.state.serviceDescription,
          minPrice: this.state.minPrice,
          maxPrice: this.state.maxPrice
        })
      });
      //  alert("Your service has been created.");
      this.props.navigation.navigate("Home", {});
    });
  };

  // update state
  onPress = data => this.setState({ data });

  render() {
    const { navigation } = this.props;
    let selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton
      ? selectedButton.value
      : this.state.data[0].label;

    return (
      <View style={{ flex: 1 }}>
        <IndicatorViewPager
          style={{ flex: 1 }}
          indicator={this._renderDotIndicator()}
        >
          <View style={st.formView}>
            <View style={st.formStepIndicatorView}>
              <StepIndicator
                stepCount={3}
                // renderStepIndicator={this.renderStepIndicator}
                customStyles={secondIndicatorStyles}
                currentPosition={0}
                labels={[]} 
              />
            </View>
            <View style={st.formInputContainerView}>
              <View>
                <Icon
                  name={"chevron-right"}
                  size={38}
                  color={"#E88D72"}
                  style={st.formChevronInputIcon}
                />
                <TextInput
                  style={st.formTextInput}
                  type="text"
                  value={this.state.sellerName}
                  placeholder={"Seller Name"}
                  placeholderTextColor={"rgba(255,255,255,0.7)"}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View>
                <Icon
                  name={"chevron-right"}
                  size={38}
                  color={"#E88D72"}
                  style={st.formChevronInputIcon}
                />
                <TextInput
                  style={st.formTextInput}
                  type="text"
                  placeholder="Service Name"
                  placeholderTextColor={"rgba(255,255,255,0.7)"}
                  onChangeText={text => this.setState({ serviceName: text })}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={st.formDropdownView}>
                <View style={{position:'relative', top:-4}}>
                  <Dropdown
                    label="Service Category"
                    labelFontSize={14}
                    data={this.state.data}
                    style={{ color: "rgba(255,255,255,0.7)" }}
                    itemCount={3}
                    baseColor="rgba(255,255,255,0.7)"
                    onChangeText={text =>
                      this.setState({ serviceCategory: text })
                    }
                  />
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }} />
          </View>

          <View style={st.formView}>
            <View style={st.formStepIndicatorView}>
              <StepIndicator
                stepCount={3}
                // renderStepIndicator={this.renderStepIndicator}
                customStyles={secondIndicatorStyles}
                currentPosition={1}
                labels={[]}
              />
            </View>
            <View style={st.formInputContainerView}>
              <View style={st.formSliderView}>
                <Slider
                  value={this.state.proximity}
                  onValueChange={value => this.setState({ proximity: value })}
                  minimumValue={5}
                  maximumValue={100}
                  thumbTouchSize={{ width: 70, height: 80 }}
                  minimumTrackTintColor="#00000097"
                  maximumTrackTintColor="white"
                  step={1}
                  style={{ width: WIDTH - 155 }}
                  thumbTintColor="#FF8882"
                />
                <View style={{ flexDirection: "row" }}>
                  <Icon2
                    name="map-marker-radius"
                    size={33}
                    color={"#E88D7295"}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      paddingTop: 7,
                      color: "rgba(255,255,255,0.7)"
                    }}
                  >
                    Proximity: {this.state.proximity} km
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Icon3
                    name={"dollar"}
                    size={20}
                    color={"#E88D7295"}
                    style={st.formDollarInputIcon}
                  />
                  <TextInput
                    style={st.formTextInputPrice}
                    type="text"
                    placeholder="Min"
                    placeholderTextColor={"rgba(255,255,255,0.7)"}
                    onChangeText={text => this.setState({ minPrice: text })}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View>
                  <Icon3
                    name={"dollar"}
                    size={20}
                    color={"#E88D7295"}
                    style={st.formDollarInputIcon}
                  />
                  <TextInput
                    style={st.formTextInputPrice}
                    type="text"
                    placeholder="Max"
                    placeholderTextColor={"rgba(255,255,255,0.7)"}
                    onChangeText={text => this.setState({ maxPrice: text })}
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>
              <View style={st.formUploadImageButton}>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      width: WIDTH - 125,
                      height: 45
                    }}
                  >
                    <Icon2
                      name="image-plus"
                      size={30}
                      color={"#E88D7295"}
                      style={{ paddingRight: 5, paddingBottom: 3 }}
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        color: "rgba(255,255,255,0.7)"
                      }}
                    >
                      Upload Image
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }} />
          </View>

          <View style={st.formView}>
            <View style={st.formStepIndicatorView}>
              <StepIndicator
                stepCount={3}
                // renderStepIndicator={this.renderStepIndicator}
                customStyles={secondIndicatorStyles}
                currentPosition={2}
                labels={[]}
              />
            </View>
            <View style={st.formInputContainerView}>
              <View
                style={{
                  alignItems: "flex-start"
                }}
              >
                <Icon
                  name={"chevron-right"}
                  size={38}
                  color={"#E88D72"}
                  style={st.formChevronInputIcon}
                />
                <TextInput
                  style={st.formDescriptionInput}
                  type="text"
                  placeholder="Description"
                  placeholderTextColor={"rgba(255,255,255,0.7)"}
                  onChangeText={text =>
                    this.setState({ serviceDescription: text })
                  }
                  underlineColorAndroid="transparent"
                  multiline={true}
                />
              </View>
              <View style={st.submitFormButton}>
                <TouchableOpacity
                  style={st.btnForm}
                  onPress={() => this.becomeASeller().bind()}
                >
                  <Text style={st.btnText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }} />
          </View>
        </IndicatorViewPager>
      </View>
    );
  }
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} style={{ paddingBottom: 3 }} />;
  }

  renderViewPagerPage = data => {
    return (
      <View style={styles.page}>
        <Text>{data}</Text>
      </View>
    );
  };

  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  );
}

const st = require("./style");
const styles = StyleSheet.create({});
const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#fe7013",
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: "#fe7013",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#fe7013",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#fe7013",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013"
};
export default SellAService;
