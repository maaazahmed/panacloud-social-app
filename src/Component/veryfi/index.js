import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native"
import { Item, Input, } from 'native-base';
import firebase from "react-native-firebase"
import { currentUserAction } from "../../store/action/action"
import { connect } from "react-redux";




const database = firebase.database().ref('/')
class VeryfiAccount extends Component {
    constructor() {
        super()
        this.state = {
            confirmCodeNumber: "",
            message: " Enter Veryfication Code",
            confirmResult: null
        }
    }

    confirmCode() {
        const { confirmCodeNumber } = this.state;
        let confirmResult = this.props.confirmResult.confirmResult
        if (confirmCodeNumber.length) {
            confirmResult.confirm(confirmCodeNumber)
                .then((user) => {
                    user._user.accountType = "User";
                    database.child(`user/${user._user.uid}`).set(user._user)
                    // this.props.currentUserAction()
                    this.props.navigation.navigate("Dashboard")
                }).catch((error) => { });
        }
    };


    render() {
        return (
            <View style={styles.container} >
                <View>
                    <Text style={{
                        fontSize: 22,
                        color: "#3f51b5"
                    }} >
                        {this.state.message}
                    </Text>
                </View>
                <View style={styles.FormContainer} >
                    <View style={styles.fomViwe} >
                        <Item>
                            <Input
                                value={this.state.confirmCodeNumber}
                                onChangeText={(confirmCodeNumber) => { this.setState({ confirmCodeNumber }) }}
                                placeholderTextColor="#3f51b5"
                                keyboardType="numeric"
                                style={styles.TextInnput}
                                placeholder="Veryfication code" />
                        </Item>
                    </View>
                    <View style={styles.sendButtonView} >
                        <TouchableOpacity
                            onPress={this.confirmCode.bind(this)}
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
    TextInnput: {
        color: "#3f51b5"
    }

});





const mapStateToProp = (state) => {
    return ({
        confirmResult: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        currentUserAction: (data) => {
            dispatch(currentUserAction(data))
        },
    };
};


export default connect(mapStateToProp, mapDispatchToProp)(VeryfiAccount)
