import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native"
import { Item, Input, } from 'native-base';
import firebase from "react-native-firebase"
import {connect} from "react-redux"










export default class CreateAccount extends Component {

  constructor() {
    super()
    this.state = {
      phoneNumber: "",
      message: " Enter Your Phone Number"
    }
  }



  signIn() {
    // const { phoneNumber } = this.state;
    // if (phoneNumber !== "") {
    //   this.setState({ message: 'Sending code ...' });
    //   firebase.auth().signInWithPhoneNumber(phoneNumber)
    //     .then((confirmResult) => {
    //       console.log(confirmResult)
    //       this.setState({ confirmResult, message: 'Code has been sent!' })

    //     })
    //     .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
    // }
    // else {
    //   alert("Please Enter Phone number")
    // }
    this.props.navigation.navigate("VeryfiAccount")
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;
    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };


  render() {
    return (
      <View style={styles.container} >
        <View style={{}}  >
          <Text style={{ fontSize: 22, color: "#3f51b5" }} >
            {this.state.message}
          </Text>
        </View>
        <View style={styles.FormContainer} >
          <View style={styles.fomViwe} >
            <Item>
              <Input
                value={this.state.phoneNumber}
                onChangeText={(phoneNumber) => { this.setState({ phoneNumber }) }}
                placeholderTextColor="#3f51b5"
                keyboardType="numeric"
                style={styles.TextInnput}
                placeholder="Phone number" />
            </Item>
          </View>
          <View style={styles.sendButtonView} >
            <TouchableOpacity
              onPress={this.signIn.bind(this)}
              activeOpacity={0.5}
              style={styles.sendButton}>
              <Text style={styles.sendButtonText} >SEND</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
  },
  FormContainer: {
    width: "90%",
    height: Dimensions.get("window").height / 4,
    backgroundColor: '#fafafa',
    padding: 20,

  },
  fomViwe: {
    flex: 1,
    height: "10%",
    backgroundColor: "#fafafa"
  },
  sendButtonView: {
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 17,
  },
  sendButton: {
    backgroundColor: "#3f51b5",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    height: "45%",
    borderRadius: 3,
    elevation: 3
  },
  TextInnput:{
    color:"#3f51b5"
  }

});
