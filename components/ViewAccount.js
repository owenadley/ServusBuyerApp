import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';


class ViewAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photo: null
    }
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

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
  }

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
    this.props.navigation.navigate('PaymentInfo');
  }
  editLoginSecurity = () => {
    this.props.navigation.navigate('EditLoginSecurity');
  }


  render() {
    const { photo } = this.state
    return (
      <View style={st.container}>
      { photo && (
        <Image
          source={{ uri: photo.uri}}
          style={{width: 100, height: 100}}
        ></Image>
      )}
          <Text style={styles.heading}>Services</Text>
          <TouchableOpacity>
            <Text style={styles.subHeading}>Your one-time services</Text>
          </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.subHeading}>Your contracts</Text>
              <Icon name={"right"} style={{textAlign: "right"}}></Icon>
            </TouchableOpacity>
          
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
          </TouchableOpacity>
          
          <Button title="Choose Photo" onPress={() => this.handleChoosePhoto()} />
          <Button title="Upload Photo" onPress={() => this.handleUploadPhoto()} />
      </View>
    );
  }
}

const st = require('./style');
const styles = StyleSheet.create({
  heading: {
    fontFamily: "Arial",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "left",
    color: "#000000",
    margin: 10
  },
  subHeading:{
    fontFamily: "Arial",
    fontSize: 15,
    textAlign: "left",
    color: "#000000",
    paddingLeft: 20,
    paddingBottom:5
  },
  subContainer: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },

});
export default ViewAccount;
