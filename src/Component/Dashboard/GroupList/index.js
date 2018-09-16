import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Header, List, ListItem, Body, Right, Button, Icon, Drawer, Left } from 'native-base';
import SideBar from "../../SideBar/index"


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
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.4}
                panCloseMask={0.4}
                content={<SideBar navigator={this.navigator} />} >
                <View>
                    <Header >
                        <Body>
                            <TouchableOpacity
                                onPress={() => this.openDrawer()}
                                activeOpacity={0.5} >
                                <Icon name='menu'
                                    style={{ color: "#fff" }} />
                            </TouchableOpacity>
                        </Body>
                    </Header>
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
            </Drawer>
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
