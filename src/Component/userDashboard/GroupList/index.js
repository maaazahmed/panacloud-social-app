import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { List, ListItem, Body, Right, Button, Item, Input, Header, Icon, Left, Card, CardItem, Thumbnail } from 'native-base';
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { groupListAction, viewGroupAction, messageAction, requestList } from "../../../store/action/action";
import SearchInput, { createFilter } from 'react-native-search-filter';





const KEYS_TO_FILTERS = ["newGroupVal"];
const database = firebase.database().ref("/")
class GroupList extends Component {
    constructor() {
        super()
        this.state = {
            count: 15,
            searchTerm: '',
            dialogVisible: false,
            dialogVisible2: false,
            messageVal: "",
            isInputError: false,
            isJoin: "Join"

        }
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    addGruop() {
        let { newGroupVal } = this.state;
        let groupObj = {
            newGroupVal,
        }
        if (newGroupVal !== "") {
            this.setState({
                dialogVisible: false,
                newGroupVal: "",
                isInputError: false
            })
            database.child("Groups").push(groupObj)
        }
        else {
            this.setState({
                isInputError: true
            })
        }
    }

    componentDidMount() {
        database.child("Groups").on("value", (snap) => {
            let groupsArr = []
            let obj = snap.val();
            for (let key in obj) {
                groupsArr.push({ ...obj[key], key })
            }
            this.props.groupListAction(groupsArr, this.props.currentUser.currentUser)
        })


    }
    joinGroup(groupData) {
        firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    let currentUser = this.props.currentUser.currentUser
                    groupData.idAdd = false;
                    let joinObj = {
                        currentUser,
                        groupData,
                        fcmToken
                    }
                    database.child(`invitations`).push(joinObj).then(() => {
                        this.setState({
                        })
                        alert("Request submit")
                    })
                }
            });
    }


    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    sendMessage() {
        this.props.currentUser.currentUser.phoneNumber
        let messageObj = {
            groupID: this.props.groupMessages.ViewGroup.key,
            phoneNumber: this.props.currentUser.currentUser.phoneNumber,
            message: this.state.messageVal,
            groupNaem: this.props.groupMessages.ViewGroup.newGroupVal,
            currentUserID: this.props.currentUser.currentUser.uid,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
        }
        if (messageObj.message !== "") {
            database.child("message").push(messageObj)
            this.setState({
                messageVal: ""
            })

            database.child(`Groups/${messageObj.groupID}/groupToken`).on("value", snap => {
                let groupTokenArr = []
                let obj = snap.val()
                for (let key in obj) {
                    for (let key2 in obj[key]) {
                        groupTokenArr.push(obj[key][key2])
                    }
                }


                firebase.messaging().hasPermission()
                    .then(enabled => {
                        if (enabled) {
                            var key = 'AAAAnfZgUo8:APA91bExL_IslF6cLR3bPb7uVSn6ALTTYVPkGpdKbI1ya5P5Z89bwXeV_TUyneOg4voDTpF9apIJpXg__NP4vBTjbxTSrg3C5FcILPHtZB828usMINOYC19LEW88D-d8QZ-xdkl-EsGc';
                            fetch('https://fcm.googleapis.com/fcm/send', {
                                'method': 'POST',
                                'headers': {
                                    'Authorization': 'key=' + key,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    notification: {
                                        title: messageObj.groupNaem,
                                        body: messageObj.phoneNumber,
                                        click_action: ""
                                    },
                                    registration_ids: groupTokenArr
                                })
                            })
                        }
                    });
            })
        }
        else {
            alert("Please write")
        }
    }

    ViewGroup(groupData) {
        database.child("message").orderByChild('timestamp').on("value", (snap) => {
            let messOBJ = snap.val()
            let messageArr = []
            for (let key in messOBJ) {
                if (messOBJ[key].groupID === this.props.groupMessages.ViewGroup.key)
                    messageArr.push({ ...messOBJ[key], key })
            }
            let newMessageArr = messageArr
            this.props.messageAction(newMessageArr)
        })
        this.props.viewGroupAction(groupData)
        this.setState({
            dialogVisible2: true
        })
    }

    render() {
        let groupList = this.props.groupList.groupList;
        let messages_list = this.props.messages_list.messages;
        let joinGroup = this.props.currentUser.currentUser.JoinedGroups;
        const filteredEmails = groupList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        let joinGroupArr = []
        for (let key in joinGroup) {
            joinGroupArr.push({ ...joinGroup[key], key })
        }
        return (
            <View style={styles.container} >
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 5,
                    borderColor: "#3f51b5",
                    elevation: 5,
                    backgroundColor: "transparent",
                    borderRadius: 2,
                    height: 50
                }} >
                    <View style={{ flex: 1 }} >
                        <SearchInput
                            style={{ backgroundColor: "#fff" }}
                            onChangeText={(groupList) => { this.searchUpdated(groupList) }}
                            placeholder="Search" />
                    </View>
                    <View style={{ paddingRight: 2 }}>
                        <Icon name="search" style={{ color: "#3f51b5" }} />
                    </View>
                </View>
                <View style={styles.GroupListContainer} >
                    <List style={{ marginLeft: 0, backgroundColor: "#fff" }} >
                        <FlatList
                            onScroll={() => { this.setState({ count: this.state.count + 3 }) }}
                            data={groupList}
                            renderItem={({ item, index }) =>
                                <Card style={{ elevation: 0, marginTop: 0, marginBottom: 0 }} >
                                    <CardItem>
                                        <Left>
                                            <Thumbnail
                                                source={{ uri: item.groupImg }} />
                                            <Body>
                                                <Text style={{ fontWeight: "bold", color: "#3f51b5" }}>{item.newGroupVal}</Text>
                                                {/* <Text note>{item.message.slice(0, 10)}...</Text> */}
                                            </Body>
                                        </Left>
                                        <Right>
                                            {joinGroupArr.find(e => e.groupID === item.key)
                                                ? <Button onPress={this.ViewGroup.bind(this, item)} transparent>
                                                    <Text style={{ color: "#3f51b5" }} >View</Text>
                                                </Button>
                                                : <Button onPress={this.joinGroup.bind(this, item)} transparent>
                                                    <Text style={{ color: "#3f51b5" }} >{this.state.isJoin}</Text>
                                                </Button>
                                            }
                                        </Right>
                                    </CardItem>
                                </Card>
                            }
                            keyExtractor={(item) => {
                                return item.key
                            }} />
                    </List>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.dialogVisible2}
                    onTouchOutside={() => this.setState({ dialogVisible2: false })} >
                    <View style={{ backgroundColor: "#fff", flex: 1, }} >
                        <Header>
                            <View style={{
                                flex: 1, alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: "row"
                            }} >
                                <TouchableOpacity onPress={() => this.setState({ dialogVisible2: false })} >
                                    < Icon name="arrow-back" style={{ color: "#fff", fontSize: 20 }} />
                                </TouchableOpacity>
                            </View>
                        </Header>
                        <View style={{ backgroundColor: "#f2f2f2", flex: 10 }} >
                            <FlatList
                                data={messages_list}
                                renderItem={({ item, index }) =>
                                    (this.props.currentUser.currentUser.uid === item.currentUserID) ?
                                        <View style={{
                                            backgroundColor: "#fff",
                                            minHeight: 40, width: "70%", margin: 5, borderRadius: 10,
                                            padding: 20,
                                            justifyContent: "center",
                                            alignSelf: "flex-end"
                                        }} >
                                            <Text style={{ color: "#3f51b5" }}>{item.message}</Text>
                                        </View>
                                        :
                                        <View style={{
                                            backgroundColor: "#3f51b5",
                                            minHeight: 40, minWidth: "70%", margin: 10, borderRadius: 10,
                                            padding: 20,
                                            justifyContent: "center",
                                            alignSelf: "flex-start"
                                        }} >
                                            <Text style={{ color: "#fff" }}>{item.message}</Text>
                                        </View>
                                } keyExtractor={(item) => {
                                    return item.key
                                }} />
                        </View>
                        {/* <View style={{
                            flex: 1,
                            backgroundColor: "#3f51b5",
                            flexDirection: "row", justifyContent: "space-between",
                            alignItems: "center",
                            padding: 2
                        }} >
                            <View style={{ flex: 6 }} >
                                <Item>
                                    <Input
                                        value={this.state.messageVal}
                                        placeholderTextColor="#fff"
                                        style={{ color: "#fff" }}
                                        onChangeText={(messageVal) => { this.setState({ messageVal }) }}
                                        placeholder="Type Message" />
                                </Item>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                <Button transparent onPress={this.sendMessage.bind(this)} >
                                    <Icon name="send" style={{color:"#fff", fontSize:30}} />
                                </Button>
                            </View>
                        </View> */}
                    </View>
                </Modal>
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
    addButton: {
        height: 60,
        width: 60,
        backgroundColor: "#3f51b5",
        borderRadius: 100,
        position: "absolute",
        bottom: 20, right: 20,
        elevation: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    addButtonText: {

    },
    TextInnput: {
        color: "#3f51b5"
    },
    sendButton: {
        backgroundColor: "#3f51b5",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 3,
        elevation: 3
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 15,
    },
});


const mapStateToProp = (state) => {
    return ({
        groupList: state.root,
        currentUser: state.root,
        groupMessages: state.root,
        messages_list: state.root,
        invitations: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        groupListAction: (data) => {
            dispatch(groupListAction(data))
        },
        viewGroupAction: (data) => {
            dispatch(viewGroupAction(data))
        },
        messageAction: (data) => {
            dispatch(messageAction(data))
        },
        requestList: (data) => {
            dispatch(requestList(data))
        },

    };
};
export default connect(mapStateToProp, mapDispatchToProp)(GroupList)
