import React, { Component } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import firebase from "react-native-firebase"


class SideBar extends Component {
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.content_1} >
                    <Image style={styles.ImageStyle}
                     source={{ uri: "https://avatars2.githubusercontent.com/u/31310451?s=460&v=4" }} />
                    <Text style={styles.usernameStyle} >Maaz Ahmed</Text>
                </View>
                <View style={styles.content_2} >
                    <TouchableOpacity
                     onPress={() => {
                        firebase.auth().signOut().then(() => {
                            this.props.navigation.navigate("CreateAccount")
                        }) }}>
                        {/* <Text style={{ fontSize: 20, fontWeight: "bold" }} >
                            SIGN OUT
                        </Text> */}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1
    },
    content_1: {
        backgroundColor: "#3f51b5",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    content_2: {
        backgroundColor: "#fff",
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    ImageStyle: {
        height: 120,
        width: 120,
        borderRadius: 100,
        borderColor: "#fff",
        borderWidth: 2,

    },
    usernameStyle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        margin: 10
    }
})


export default SideBar