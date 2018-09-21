/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';



export default class SplashScreen extends Component {
  render() {
    return (
     <View style={{flex:1, backgroundColor:"#3f51b5", justifyContent:"center", alignItems:"center"}} >
        <Image 
        resizeMode="contain"
        source={require("./images/asdasd.png")} style={{height:150, width:150,}}  />
     </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3f51b5',
  },
});
