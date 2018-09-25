import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    Dimensions,
    Image
} from 'react-native';
import { List, ListItem, Body, Right, Button, Item, Input, Header, Icon, Left, Content, Card, CardItem, Thumbnail, } from 'native-base';
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { groupListAction, viewGroupAction, messageAction, getMemberAction } from "../../../store/action/action";
const ImagePicker = require('react-native-image-picker');
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
            isInputError: false,
            dialogVisible3: false,
            isGroupAddLoader: true,
            messageVal: "",
            fcmToken: "",
            newGroupVal: "",
            groupImgUrl: "https://coloradocustomfloors.com/wp-content/uploads/2017/05/gallery_icon_new.png",
            messegeImgUrl: "",
            isJoin: "Join"
        }
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    addGruop() {
        firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    this.setState({ fcmToken: fcmToken })
                }
            });
        let { newGroupVal, groupImgUrl } = this.state;
        let groupObj = {
            newGroupVal,
            isJoin: "JOIN",
            adminfcmToken: this.state.fcmToken
        }
        if (newGroupVal !== "" && groupImgUrl !== "https://coloradocustomfloors.com/wp-content/uploads/2017/05/gallery_icon_new.png") {

            this.setState({
                isGroupAddLoader: false
            })

            const storageRef = firebase.storage().ref('/');
            var file = this.state.groupImgUrl;
            var metadata = {
                contentType: 'image/jpeg'
            };
            var uploadTask = storageRef.child('images/' + Date.now()).put(file, metadata);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            break;
                    }
                }, function (error) {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, (snapshot) => {
                    groupObj.groupImg = snapshot.downloadURL
                    database.child("Groups").push(groupObj)
                    this.setState({
                        dialogVisible: false,
                        isInputError: false,
                        isGroupAddLoader: true,
                        newGroupVal: "",
                        groupImgUrl: "https://coloradocustomfloors.com/wp-content/uploads/2017/05/gallery_icon_new.png"
                    })
                });
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

        let membersArr = []
        for (let key in groupData.members) {
            membersArr.push({ ...groupData.members[key] })
        }
        this.props.viewGroupAction(groupData)
        this.props.getMemberAction(membersArr)
        this.setState({
            dialogVisible2: true
        })
    }
    sendMessage() {
        this.props.currentUser.currentUser.phoneNumber
        let messageObj = {
            groupID: this.props.groupMessages.ViewGroup.key,
            phoneNumber: this.props.currentUser.currentUser.phoneNumber,
            message: this.state.messageVal,
            groupNaem: this.props.groupMessages.ViewGroup.newGroupVal,
            groupImg: this.props.groupMessages.ViewGroup.groupImg,
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
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    notification: {
                                        title: messageObj.groupNaem,
                                        body: messageObj.phoneNumber,
                                        click_action: ""
                                    },
                                    registration_ids: groupTokenArr
                                })
                            }).then(function (response) {
                            }).catch(function (error) {
                            })
                        }
                    });
            })

        }
        else {
            alert("Please write")
        }
    }


    addSubAdmin() {
        this.setState({
            dialogVisible3: true
        })
    }

    finalAddadmin(data) {
        let View_Group = this.props.View_Group.ViewGroup
        let newAdminObj = {
            uid: data.uid,
            phoneNumber: data.phoneNumber,
            accountType: data.accountType,
            groupID: View_Group.key,
            newAccountType: "sub_Admin",
        }
        database.child(`Groups/${View_Group.key}/Admins`).push(newAdminObj).then(() => {
            database.child(`user/${data.uid}/accountType`).set("sub_Admin")
            this.setState({
                dialogVisible3: false
            })
        })
    }



    render() {
        let groupList = this.props.groupList.groupList;
        let messages_list = this.props.messages_list.messages;
        let members_Arr = this.props.members_Arr.groupMemeber;
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
                            data={filteredEmails}
                            renderItem={({ item, index }) =>
                                <Card key={index} style={{ elevation: 0, marginTop: 0, marginBottom: 0 }} >
                                    <CardItem>
                                        <Left>
                                            <Thumbnail
                                                source={{ uri: item.groupImg }} />
                                            <Body>
                                                <Text style={{ fontWeight: "bold", color: "#3f51b5" }}>{item.newGroupVal}</Text>
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
                            keyExtractor={(item) => { return item.key }} />
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
                                flex: 1,
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }} >
                                <TouchableOpacity onPress={() => this.setState({ dialogVisible2: false })} >
                                    < Icon name="arrow-back" style={{ color: "#fff", fontSize: 20 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.addSubAdmin.bind(this)} activeOpacity={0.6}  >
                                    < Icon name="person-add" style={{ color: "#fff", fontSize: 20 }} />
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

                        <View style={{
                            width: "100%",
                            backgroundColor: "#3f51b5",
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 0,
                            margin: 0
                        }} >
                            <View style={{ flex: 1 }} >
                                <Input
                                    multiline={true}
                                    value={this.state.messageVal}
                                    placeholderTextColor="#fff"
                                    style={{ color: "#fff" }}
                                    onChangeText={(messageVal) => { this.setState({ messageVal }) }}
                                    placeholder="Type Message" />
                            </View>
                            <View style={{ justifyContent: "flex-start", alignItems: "flex-start", }} >
                                <Button transparent onPress={this.sendMessage.bind(this)}>
                                    <Icon name="send" style={{ color: "#fff", fontSize: 30 }} />
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal visible={this.state.dialogVisible3} transparent={true} animationType="fade" >
                    <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center" }} >
                        <View style={{ height: Dimensions.get("window").height / 1.2, width: "95%", backgroundColor: "#fff" }} >
                            <FlatList data={members_Arr}
                                renderItem={({ item, index }) => (
                                    (item.uid !== this.props.currentUser.currentUser.uid) ?
                                        <TouchableOpacity activeOpacity={0.6}
                                            onPress={this.finalAddadmin.bind(this, item)} >
                                            <Card key={index} style={{ elevation: 0, marginTop: 0, marginBottom: 0 }} >
                                                <CardItem>
                                                    <Left>
                                                        <Thumbnail
                                                            source={{ uri: item.groupImg || "https://tse1.mm.bing.net/th?id=OIP.wbLH6MmOdiPwIi4fWjYmrAAAAA&pid=15.1&P=0&w=300&h=300" }} />
                                                        <Body>
                                                            <Text
                                                                style={{ fontWeight: "bold", color: "#3f51b5" }}>{item.phoneNumber}</Text>
                                                        </Body>
                                                    </Left>
                                                </CardItem>
                                            </Card>
                                        </TouchableOpacity>
                                        :
                                        <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }} >
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: "bold",
                                                marginTop: "20%",
                                                color: "#3f51b5"

                                            }} >
                                                No User
                                         </Text>
                                        </View>
                                )} keyExtractor={(item) => {
                                    return item.key
                                }} />
                            <View style={{ height: 60, justifyContent: "flex-end", alignItems: "center" }} >
                                <TouchableOpacity onPress={() => { this.setState({ dialogVisible3: false }) }} >
                                    <Text style={{ color: "#3f51b5", margin: 10 }} >Cancele</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        members_Arr: state.root,
        View_Group: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        groupListAction: (data, currentUser) => {
            dispatch(groupListAction(data, currentUser))
        },
        viewGroupAction: (data) => {
            dispatch(viewGroupAction(data))
        },
        messageAction: (data) => {
            dispatch(messageAction(data))
        },
        getMemberAction: (data) => {
            dispatch(getMemberAction(data))
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(GroupList)
