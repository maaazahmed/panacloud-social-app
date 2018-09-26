import React, { Component } from "react"
import { TouchableOpacity, View,  } from "react-native"
import { createBottomTabNavigator } from "react-navigation"
import { Drawer, Header, Body, Icon,  } from "native-base"
import GroupList from "./GroupList/index"
import RequestList from "./RequestList"
import SideBar from "../SideBar/index";
import MessagesComponent from "./AllMesseges/index"
import { connect } from "react-redux"
import Icons from "react-native-vector-icons/FontAwesome"


class DashboardMain extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };




    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.4}
                panCloseMask={0.4}
                content={<SideBar navigator={this.navigator} />} >
                <Header >
                    <Body style={{flexDirection:"row", alignItems:"center"}} >
                        <TouchableOpacity
                            onPress={() => this.openDrawer()}
                            activeOpacity={0.5} >
                            <Icon name='menu'
                                style={{ color: "#fff" }} />
                        </TouchableOpacity>
                    </Body>
                </Header>
                <View style={{ flex: 1 }} >
                    <Dashboard />
                </View>
            </Drawer>
        )
    }
}


const Dashboard = createBottomTabNavigator({
    Messages: {
        screen: MessagesComponent,
        navigationOptions: {
            tabBarIcon: () => <Icon
                name="chatboxes"
                style={{ color: "#fff" }} />
        }
    },
    Group: {
        screen: GroupList,
        navigationOptions: {
            tabBarIcon: () => <Icons
                name="users"
                size={25}
                style={{ color: "#fff" }} />
        }
    },
    Invitations: {
        screen: RequestList,
        navigationOptions: {
            tabBarIcon: () => <Icon
                name="person-add"
                style={{ color: "#fff" }} />
        }
    }
},
    {
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            activeTintColor: '#3f51b5',
            inactiveTintColor: "#3f51b5",
            activeBackgroundColor: "#3f51b5",
            style: {
                backgroundColor: '#3f51b5',
            },
            labelStyle: {
                fontSize: 18,
                alignContent: "flex-start",
                paddingBottom: 10
            },
        }
    }
)



const mapStateToProp = (state) => {
    return ({
        currentUserData: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {};
};


export default connect(mapStateToProp, mapDispatchToProp)(DashboardMain)
