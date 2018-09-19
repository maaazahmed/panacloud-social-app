import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    Dimensions
} from 'react-native';
import { List, ListItem, Body, Right, Button, Item, Input, Header, Icon, Left } from 'native-base';
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import { groupListAction, viewGroupAction, messageAction } from "../../../store/action/action";



const database = firebase.database().ref("/")
class GroupList extends Component {
    constructor() {
        super()
        this.state = {
            count: 15,
            dialogVisible: false,
            dialogVisible2: false,
            messageVal: "",
            isInputError: false,

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
        this.props.groupListAction(thdatais.props.currentUser.currentUser)
        console.log(this.props.currentUser.currentUser,"00000000000")

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


    sendMessage() {
        this.props.currentUser.currentUser.phoneNumber
        let messageObj = {
            groupID: this.props.groupMessages.ViewGroup.key,
            phoneNumber: this.props.currentUser.currentUser.phoneNumber,
            message: this.state.messageVal,
            groupNaem: this.props.groupMessages.ViewGroup.newGroupVal,
            currentUserID: this.props.currentUser.currentUser.uid,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }
        if (messageObj.message !== "") {
            database.child("message").push(messageObj)
            this.setState({
                messageVal:""
            })
        }
        else {
            alert("Please write")
        }
    }



    render() {
        let groupList = this.props.groupList.groupList;
        let messages_list = this.props.messages_list.messages;
        return (
            <View style={styles.container} >
                <View style={styles.GroupListContainer} >
                    <List style={{ marginLeft: 0, backgroundColor: "#fff" }} >
                        <FlatList
                            onScroll={() => { this.setState({ count: this.state.count + 3 }) }}
                            data={groupList}
                            renderItem={({ item, index }) =>
                                <ListItem key={index} style={styles.ListItem} >
                                    <Body>
                                        <Text style={styles.GroupName} >{item.newGroupVal}</Text>
                                        <Text note numberOfLines={1}>{index + 1}</Text>
                                    </Body>
                                    <Right>
                                        <Button onPress={this.ViewGroup.bind(this, item)} transparent>
                                            <Text style={{ color: "green" }} >View</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
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
                            <Left>
                                <Button onPress={() => this.setState({ dialogVisible2: false })} transparent >
                                    < Icon name="arrow-back" />
                                </Button>
                            </Left>
                        </Header>
                        <View style={{ backgroundColor: "#f2f2f2", flex: 10 }} >
                            <FlatList
                                data={messages_list}
                                renderItem={({ item, index }) =>
                                    (this.props.currentUser.currentUser.uid === item.currentUserID) ?
                                        <View style={{
                                            backgroundColor: "#fff",
                                            minHeight: 40, width: "70%", margin: 5, borderRadius: 50,
                                            padding: 10,
                                            justifyContent: "center",
                                            alignSelf: "flex-end"
                                        }} >
                                            <Text style={{ color: "#3f51b5" }}>{item.message}</Text>
                                        </View>
                                        :
                                        <View style={{
                                            backgroundColor: "#3f51b5",
                                            minHeight: 40, minWidth: "70%", margin: 10, borderRadius: 50,
                                            padding: 10,
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
                                    <Text style={{ color: "#fff" }}  >SEND</Text>
                                </Button>
                            </View>
                        </View>

                    </View>

                </Modal>




                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({ dialogVisible: false })} >
                    <View style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <View
                            style={{ height: Dimensions.get("window").height / 3, width: "90%", backgroundColor: "#fff", elevation: 50, padding: 10 }} >
                            <View style={{ flex: 1, }}>
                                <Text style={{ fontSize: 20, fontWeight: "600", color: "#3f51b5" }} >
                                    Add new group
                               </Text>
                            </View>
                            <View style={{ flex: 1, }} >
                                <Item style={{ borderBottomColor: (this.state.isInputError) ? "red" : null }} >
                                    <Input
                                        value={this.state.newGroupVal}
                                        onChangeText={(newGroupVal) => { this.setState({ newGroupVal }) }}
                                        placeholderTextColor={(this.state.isInputError) ? "red" : "#3f51b5"}
                                        style={styles.TextInnput}
                                        placeholder="New Group" />
                                </Item>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }} >
                                <TouchableOpacity
                                    onPress={this.addGruop.bind(this)}
                                    activeOpacity={0.5}
                                    style={styles.sendButton}>
                                    <Text style={styles.sendButtonText} >ADD GROUP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>






                {(this.props.currentUser.currentUser.accountType === "admin") ?
                    <TouchableOpacity
                        onPress={() => { this.setState({ dialogVisible: true }) }}
                        activeOpacity={0.7}
                        style={styles.addButton} >
                        <Text style={{ color: "#fff", fontSize: 30 }} >
                            +
                        </Text>
                    </TouchableOpacity>
                    : null}
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
        messages_list: state.root
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
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(GroupList)
