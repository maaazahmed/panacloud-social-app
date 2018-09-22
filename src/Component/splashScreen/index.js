import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';
import { connect } from "react-redux"
import { currentUserAction } from "../../store/action/action"
import firebase from "react-native-firebase";




const database = firebase.database().ref("/")
class SplashScreen extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        database.child(`user/${user._user.uid}`).on("value", (snap) => {
          let currentUser = snap.val()
          if (currentUser) {
            if (currentUser.accountType === "User") {
              setTimeout(() => {
                this.props.navigation.navigate("UserDashboardMain")
              }, 4000)
            }
            else if (currentUser.accountType === "admin") {
              firebase.messaging().getToken()
              setTimeout(() => {
                this.props.navigation.navigate("Dashboard")
              }, 4000)

            }
            this.props.currentUserAction(currentUser)
          }
        })
      }
      else {
        setTimeout(() => {
          this.props.navigation.navigate("CreateAccount")
        }, 4000)
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#3f51b5", justifyContent: "center", alignItems: "center" }} >
        <Image
          resizeMode="contain"
          source={require("./images/asdasd.png")} style={{ height: 150, width: 150, }} />
      </View>

    );
  }
}


const mapStateToProp = (state) => {
  return ({
    currentUser: state.root,
  });
};
const mapDispatchToProp = (dispatch) => {
  return {
    currentUserAction: (data) => {
      dispatch(currentUserAction(data))
    },

  };
};
export default connect(mapStateToProp, mapDispatchToProp)(SplashScreen)
