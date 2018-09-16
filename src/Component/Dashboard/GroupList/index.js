import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import { List, ListItem, Body, Right, Button, } from 'native-base';
import {connect} from "react-redux"


export default class GroupList extends Component {
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
    }
});
