import React, { Component } from "react"
import { TouchableOpacity, View } from "react-native"
import { createBottomTabNavigator } from "react-navigation"
import { Drawer, Header, Body, Icon } from "native-base"
import GroupList from "./GroupList/index"
import RequestList from "./RequestList"
import SideBar from "../SideBar/index";
import MessagesComponent from "./AllMesseges/index"
import firebase from "react-native-firebase";
import { connect } from "react-redux"



const database = firebase.database().ref("/")


class DashboardMain extends Component {
constructor(){
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


    componentWillMount() {
        // database.child(`user/${this.props.currentUserData.currentUser._user.uid}`).on("value", (snap) => {
        //     let currentUser = snap.val()
        //     // console.log(currentUser, "==================")
        //     this.setState({
        //         currentUser
        //     })
        // })
    }



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
                <View style={{ flex: 1 }} >
                    <Dashboard />
                </View>
            </Drawer>
        )
    }
}


const Dashboard = createBottomTabNavigator({
    Messages: { screen: MessagesComponent },
    Group: { screen: GroupList },
    Invitations: { screen: RequestList },
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
            },
        }
    }
)



const mapStateToProp = (state) => {
    return ({
        currentUserData: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // FeedbackAction: (data) => {
        //     dispatch(FeedbackAction(data))
        // },
    };
};


export default connect(mapStateToProp, mapDispatchToProp)(DashboardMain)
