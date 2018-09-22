import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';

import { Card, CardItem, Thumbnail, Left, Body,  } from 'native-base';

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
        return (
            <View style={styles.container} >
                <FlatList
                    style={{ backgroundColor: "#f2f2f2" }}
                    data={Allmessages}
                    renderItem={({ item, index }) => {
                        for (let key in JoinedGroups) {
                            if (JoinedGroups[key].groupID === item.groupID) {
                                return (
                                    <TouchableOpacity key={index} activeOpacity={0.5} >
                                        <Card style={{ elevation: 0, marginTop: 0, marginBottom: 0 }} >
                                            <CardItem>
                                                <Left>
                                                    <Thumbnail
                                                        source={{ uri: 'https://odesk-prod-portraits.s3.amazonaws.com/Users:masazahmed:PortraitUrl_100?AWSAccessKeyId=AKIAIKIUKM3HBSWUGCNQ&Expires=2147483647&Signature=I7I0ShoIpwfgZhjjAJgyGsOlJvo%3D&1532386522762000' }} />
                                                    <Body>
                                                        <Text style={{ fontWeight: "bold", color: "#3f51b5" }}>{item.groupNaem}</Text>
                                                        <Text note>{item.message.slice(0, 10)}...</Text>
                                                    </Body>
                                                </Left>
                                            </CardItem>
                                        </Card>
                                    </TouchableOpacity>
                                )
                            }
                        }
                    }
                    } keyExtractor={(item) => {
                        return item.key
                    }} />
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

