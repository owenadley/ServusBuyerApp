"use strict";
var React = require("react-native");
var { StyleSheet, Dimensions } = React;

const { width: WIDTH } = Dimensions.get("window");

module.exports = StyleSheet.create({
  authContainer: {
    flex: 1,
    width: null,
    height: null,
    //backgroundColor: "#8F4370",
    justifyContent: "center",
    alignItems: "center"
  },
  bodyBlack: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "#000000"
  },
  bodyWhite: {
    fontFamily: "Arial",
    fontSize: 15,
    color: "#ffffff"
  },
  container: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "white",
    padding: 10
  },
  heading1: {
    fontFamily: "Arial",
    fontSize: 40,
    fontWeight: "500",
    textAlign: "center",
    color: "#000000",
    margin: 40
  },
  heading2: {
    fontFamily: "Arial",
    fontSize: 20,
    textAlign: "center",
    color: "#000000",
    margin: 10
  },
  horizontalBorder: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    padding: 10
  },
  logo: { width: 120, height: 120 },
  logoContainer: { alignItems: "center", marginBottom: 50 },
  servus: {
    fontSize: 40,
    fontWeight: "500",
    marginTop: 10,
    color: "#FF8882"
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(0,0,0,0.35)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25
  },
  inputIcon: { position: "absolute", top: 8, left: 37 },
  inputContainer: { marginTop: 10 },
  btn: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#E88D72",
    justifyContent: "center",
    marginTop: 20
  },
  btnText: { color: "#543855", fontSize: 16, textAlign: "center" },
  btnEye: { position: "absolute", top: 8, right: 37 }
});
