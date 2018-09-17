import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, AsyncStorage } from "react-native"
import { Item, Input, } from 'native-base';
import firebase from "react-native-firebase"
import { connect } from "react-redux"
import { signInAction } from "../../store/action/action"




class CreateAccount extends Component {

  constructor() {
    super()
    this.state = {
      phoneNumber: "",
      message: " Enter Your Phone Number"
    }
  }


  componentWillMount(){
    firebase.auth().onAuthStateChanged((user)=>{
     if(user){
      this.props.navigation.navigate("Dashboard")
     }
    })

    AsyncStorage.getItem("phoneNumber").then((value) => {
      this.setState({phoneNumber: value});
      // console.log(value,"")
  }).done();
  }



  signIn() {
    const { phoneNumber } = this.state;
    if (phoneNumber !== "") {
      AsyncStorage.setItem("phoneNumber",phoneNumber );
      this.props.signInAction(phoneNumber, this.props)
    }
    else {
      alert("Please Enter Phone number")
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
                keyboardType="phone-pad"
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
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: "#3f51b5",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 3,
    elevation: 3
  },
  TextInnput: {
    color: "#3f51b5"
  }

});




const mapStateToProp = (state) => {
  return ({
    catogery_List: state.root,
  });
};
const mapDispatchToProp = (dispatch) => {
  return {
    signInAction: (data, props) => {
      dispatch(signInAction(data, props))
    },
  };
};
export default connect(mapStateToProp, mapDispatchToProp)(CreateAccount)





