import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,

    Image
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Left, Body, Icon, Button, Title } from 'native-base';
import { connect } from "react-redux"
import { AllMessagesAction, viewMessages } from "../../../store/action/action"
import firebase from "react-native-firebase"



const database = firebase.database().ref("/")

class MessagesComponent extends Component {
    constructor() {
        super()
        this.state = {
            count: 15,
            modalVisible: false
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
    
    viewMessee(data) {
        this.props.viewMessages(data)
        this.setState({
            modalVisible: true
        })
    }

    render() {
        let view_Message = this.props.view_Message.ViewMesesage;
        let Allmessages = this.props.Allmessages.Allmessages
        return (
            <View style={styles.container} >
                <FlatList
                    style={{ backgroundColor: "#f2f2f2" }}
                    data={Allmessages}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={this.viewMessee.bind(this, item)}
                                key={index} activeOpacity={0.5} >
                                <Card style={{ elevation: 0, marginTop: 0, marginBottom: 0 }} >
                                    <CardItem>
                                        <Left>
                                            <Thumbnail
                                                source={{ uri: item.groupImg }} />
                                            <Body>
                                                <Text style={{ fontWeight: "bold", color: "#3f51b5" }}>{item.groupNaem}</Text>
                                                <Text note>{item.message.slice(0, 10)}...</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item) => {
                        return item.key
                    }} />
                <View>
                    <Modal
                        animationType={"fade"}
                        visible={this.state.modalVisible} >
                        <Container>
                            <Header>
                                <Left>
                                    <Button onPress={() => {
                                        this.setState({
                                            modalVisible: false
                                        })
                                    }} transparent>
                                        <Icon name='arrow-back' />
                                    </Button>
                                </Left>
                                <Body>
                                    <Title></Title>
                                </Body>
                            </Header>
                            <Content>
                                <Card style={{ flex: 0, marginTop: 0, elevation: 0, minHeight: "100%" }}>
                                    <CardItem>
                                        <Left>
                                            <Body>
                                                <Text style={{ fontSize: 20, fontWeight: "bold", color: "#3f51b5" }} >{view_Message.groupNaem}</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Image source={{ uri: view_Message.groupImg }} style={{ height: 200, width: "100%", flex: 1 }} />
                                            <Text style={{ marginTop: 10 }}>
                                                {view_Message.message}
                                            </Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Content>
                        </Container>
                    </Modal>
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
        view_Message: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        AllMessagesAction: (data) => {
            dispatch(AllMessagesAction(data))
        },
        viewMessages:(data) => {
            dispatch(viewMessages(data))
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(MessagesComponent)

