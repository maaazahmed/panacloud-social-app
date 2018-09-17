import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal
} from 'react-native';
import { List, ListItem, Body, Right, Button, Item, Input, } from 'native-base';
import { connect } from "react-redux";
import firebase from "react-native-firebase"



const database = firebase.database().ref("/")
export default class GroupList extends Component {
    constructor() {
        super()
        this.state = {
            count: 15,
            dialogVisible: false,
            newGroupVal: "",
            isInputError: false
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






    render() {
        let arr = []
        for (var i = 0; i < this.state.count; i++) {
            arr.push(
                { GroupName: "My Group", }
            )
        }
        return (
            <View>
                <View style={styles.GroupListContainer} >
                    <List style={{ marginLeft: 0 }} >
                        <FlatList
                            onScroll={() => { this.setState({ count: this.state.count + 3 }) }}
                            data={arr}
                            renderItem={({ item, index }) =>
                                <ListItem style={styles.ListItem} >
                                    <Body>
                                        <Text style={styles.GroupName} >{item.GroupName}</Text>
                                        <Text note numberOfLines={1}>{index + 1}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent>
                                            <Text style={{ color: "green" }} >Join</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            }
                            keyExtractor={(item) => { return item.key }}
                        />
                    </List>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => { this.setState({ dialogVisible: true }) }}
                        activeOpacity={0.7}
                        style={styles.addButton} >
                        <Text style={{ color: "#fff", fontSize: 30 }} >
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({ dialogVisible: false })} >
                    <View style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <View
                            style={{ height: "30%", width: "90%", backgroundColor: "#fff", elevation: 50, padding: 10 }} >
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
