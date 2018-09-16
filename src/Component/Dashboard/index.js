import React, { Component } from "react"
import { TouchableOpacity, View } from "react-native"
import { createBottomTabNavigator } from "react-navigation"
import { Drawer, Header, Body, Icon } from "native-base"
import GroupList from "./GroupList/index"
import RequestList from "./RequestList"
import SideBar from "../SideBar/index"


class DashboardMain extends Component {
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
                    <Body>
                        <TouchableOpacity
                            onPress={() => this.openDrawer()}
                            activeOpacity={0.5} >
                            <Icon name='menu'
                                style={{ color: "#fff" }} />
                        </TouchableOpacity>
                    </Body>
                </Header>
                <View style={{flex:1}} >
                    <Dashboard />
                </View>
            </Drawer>
        )
    }
}


const Dashboard = createBottomTabNavigator({
    Group: { screen: GroupList },
    RequestList: { screen: RequestList },
},
    {
        tabBarOptions: {
            activeTintColor: '#3f51b5',
            inactiveTintColor: "#fff",
            activeBackgroundColor: "#fff",
            style: {
                backgroundColor: '#3f51b5',
            },
            labelStyle: {
                fontSize: 18,
                alignContent: "flex-start",
                paddingBottom: 10
            }
        }
    }
)


export default DashboardMain