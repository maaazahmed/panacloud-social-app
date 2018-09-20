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
        <Image source={require("./lifafah.png")} style={{height:200, width:200,}}  />
     </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3f51b5',
  },
});
