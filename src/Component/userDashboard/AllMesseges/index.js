import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {
    Card,
    CardItem,
    Thumbnail,
    Left,
    Body,
    Right,
} from 'native-base';
import { connect } from "react-redux"
import { AllMessagesAction } from "../../../store/action/action"
import firebase from "react-native-firebase"



const database = firebase.database().ref("/")

class MessagesComponent extends Component {
    constructor() {
        super()
        this.state = {
            count: 15
        }
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };



    componentWillMount() {
        database.child("message").orderByChild('timestamp').on("value", (snap) => {
            let obj = snap.val()
            let messageListArr = []
            for (let key in obj) {
                messageListArr.push({ ...obj[key], key })
            }
            let newMessageListArr = messageListArr
            this.props.AllMessagesAction(newMessageListArr)
        })
    }

    render() {
        let Allmessages = this.props.Allmessages.Allmessages
        let JoinedGroups = this.props.currentUser.currentUser.JoinedGroups
        let JoinedGroupsArr = []
        for (let key in JoinedGroups) {
            JoinedGroupsArr.push({ ...JoinedGroups[key], key })
        }
        console.log(JoinedGroupsArr, "'''''''''''''''''''''")


        return (
            <View style={styles.container} >
                <FlatList
                    style={{ backgroundColor: "#f2f2f2" }}
                    data={Allmessages}
                    renderItem={({ item, index }) => {
                        for (let key in JoinedGroups) {
                            console.log(JoinedGroups[key].groupID === item.groupID)
                            if (JoinedGroups[key].groupID === item.groupID) {
                             return(
                                <View key={index} style={{
                                    backgroundColor: "#fff",
                                    width: "100%",
                                    minHeight: 100,
                                    marginBottom: 1,
                                    elevation: 5
                                }}>
                                    <View style={{ padding: 5, flexDirection: "row", justifyContent: "space-between", flex: 1 }} >
                                        <Text style={{ fontSize: 15, color: "#3f51b5", fontWeight: "600" }}>{item.groupNaem}</Text>
                                        <Text style={{ color: "#3f51b5" }}>{item.phoneNumber}</Text>
                                    </View>
                                    <View style={{ padding: 5, flexDirection: "row", justifyContent: "space-between", flex: 2, alignItems: "center" }} >
                                        <Text style={{ color: "#3f51b5" }}>{item.message}</Text>
                                    </View>
                                </View>
                                )
                            }
                        }
                    }
                    } keyExtractor={(item) => { return item.key }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    GroupName: {
        fontSize: 20,

    },
    ListItem: {
        marginLeft: 0,
        paddingLeft: 10,
    },
    GroupListContainer: {
        backgroundColor: "#fff"
    },
    listButnContainer: {
        flexDirection: "row"
    },
    ListButn: {
        backgroundColor: "red",
    },

    Card: {
        marginBottom: 0,
        elevation: 0,
    },
    CardButtun: {
        flexDirection: "row",
    },
    rejectButt: {
        margin: 5,
        marginTop: 10,
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 2,
        elevation: 1,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#3f51b5"
    },
    rejectText: {
        color: "#3f51b5"
    },
    aprovButt: {
        margin: 5,
        marginTop: 10,
        backgroundColor: "#3f51b5",
        padding: 5,
        borderRadius: 2,
        elevation: 3,
        width: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    aprovText: {
        color: "#fff"
    },
});





const mapStateToProp = (state) => {
    return ({
        Allmessages: state.root,
        currentUser: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        AllMessagesAction: (data) => {
            dispatch(AllMessagesAction(data))
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(MessagesComponent)

