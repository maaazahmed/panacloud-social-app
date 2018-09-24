import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
// import {ImagePicker} from "react-native-image-picker"
var ImagePicker = require('react-native-image-picker');




export default class TestComonent extends Component {


    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                console.log(source.uri)
            }
        });
    }


    render() {
        var options = {
            title: 'Select Avatar',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        return (

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Button  title="Pick image" onPress={this.selectPhotoTapped.bind(this)} >
                </Button>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
    },
});
