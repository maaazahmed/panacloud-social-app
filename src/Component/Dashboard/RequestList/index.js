import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {
    Card,
    CardItem,
    Thumbnail,
    Left,
    Body,
    Right,
} from 'native-base';
import { connect } from "react-redux"
import firebase from "react-native-firebase";
import { requestList, groupListAction } from "../../../store/action/action"



const database = firebase.database().ref("/")

class RequestList extends Component {
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

    componentWillMount() {
        database.child("invitations").on("value", (snap) => {
            let obj = snap.val()
            let requestListArr = []
            for (let key in obj) {
                requestListArr.push({ ...obj[key], key })
            }
            this.props.requestList(requestListArr)
        })
    }

    rejectRequest(data, index) {
        let request_list = this.props.request_list.requestList;
        let newRequestList = request_list.slice(0, index).concat(request_list.slice(index + 1));
        this.props.requestList(newRequestList)
        database.child(`invitations/${data.key}`).remove()
    }


    apprroveRequest(data, index) {
        let JoinedGroup = {
            newGroup: data.groupData.newGroupVal,
            groupID: data.groupData.key,
        }
        let request_list = this.props.request_list.requestList;
        let newRequestList = request_list.slice(0, index).concat(request_list.slice(index + 1));
        this.props.requestList(newRequestList)
        database.child(`invitations/${data.key}`).remove()
        database.child(`Groups/${data.groupData.key}/members`).push(data.currentUser)
        database.child(`user/${data.currentUser.uid}/JoinedGroups`).push(JoinedGroup)
        firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    database.child(`Groups/${data.groupData.key}/groupToken`).push({ fcmToken })
                }
            });

    }



    render() {
        let request_list = this.props.request_list.requestList;
        return (
            <View>
                <View style={styles.GroupListContainer} >
                    <FlatList
                        onScroll={() => { this.setState({ count: this.state.count + 3 }) }}
                        data={request_list}
                        renderItem={({ item, index }) =>
                            <Card key={index} style={styles.Card}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAATlBMVEX///+ZmZmdnZ2WlpaSkpL8/Py2traampr5+fmQkJC5ubnPz8/19fXZ2dnx8fHi4uKsrKzp6enJycnDw8OwsLC+vr6kpKTNzc3V1dXf39+95nWQAAAFuklEQVR4nO2dx5qrMAxGAZkhhZAAabz/i15KCpAyGSxFv7k+i1nMKudzkS0LOwg8Ho/H4/F4PB6Px+PxeDz/F3Ga5dtqs6m2eZbG2r+Gl6wqVseETANR9zfarU6bTPuXMbCoymNrROGI+l9kaHeoFtq/0YK8ONYSD25DT0PHItf+pZPID6F5K9fTNEnpmuTiFH2qd5WM1g511/TwN71rhy0dcUx/lhP8WsflwQXHYkr73dtxrf37fyOPLPwazBE7SJbGzq9pRnPWtnhNvLMXrDErbZFXpLY99ArttFWek75fvbivGHO1YKu419Z5wo5RsB6LpbbPAwXLJNNT3GobjciYBcMw0VYawdtHG8BWNzl7E9ZoSw1YsTdhPRKh1jb8fjVHbaseW4lOGhqgNfhBoJNizTWJhCDS2k1kJq0xMHnjk0gnRVrX8If7DkJZnMZCnRQnXsjEigYCSb1JDcN6IIJkwvdihigRUSYatoY/2m4tqdgwRJlq5CYalJi/FhuGKFONxN7wCm207RqkVjStYaFt1yAoGBJCgj9eShoiTKb8ecQ+CDlFyWCBsTI9S47D0KTafkFQyBoCBESZLNTNsNL2C4IfUUOEkC+3d2oNARLfR1nDk7ZfbSgpCJGMimQND9p+3tDaEGDp7Q294X9vOP+ZBiAeCkd8gESNZCIKI68//72F8P4Q4BhY7mytNQSoONnI9lKATJRUIUZHpK1XsxDNCEOU1MgdkGIEfNHDtVoRIJsoKohQ0i470dThQltQOFggpPVlhyFCyBc3VJ9qZI+eENpQehwu1etNpOdS0hYUrYgKMZZt88/TyO7xEU5I578/lKuBDiGWpYFsN0VI04iWDEGURAXNR/gkMqFGpL9ku3A6SBRGJdkeRbBmwW+IEOv78HdThBOLPvyZb4xp9A5/3F9qK41gX4CjDUP+gYg2DPkHIkwovFFxd1NtoQeYC9pBvngawHvajXD2O4Y3rbgE2BeOYd1i4MWKBs6yE4QSjEc4i/b1TyuewdhNUXa+Y/i6KUL9+jP4ZlMDOJM2sK2+EcN9B9enF2hbwztc2RqET/JewLOFwts43eGZa1DnmYaYwxChtPs1JYOi/rn2OxgCBsZhzGvskxl46Ysh1o2I3oT2jbgEb8IgWNgZ4i7Y7tjVfWNuDEfYLGyQlzN3bFanCGXdHzD9whrcTcWQeKog9nqtz3ZiIzrSRxsmNqEDkeLCxG7qDYHwht4QH2/oDfHxht4QH2/ovuH89xZTq/cxKzAeiaff4GYAbqP5nYXN213GgY5q+bwcflI/s31eDl0xtT8/xFbMEoYTUmTFnKfaBLMwsWHDVjEUYR50M7yyelMkwPQ+0yurV5YAN7MOyTnmmD4GbL45CXy7lgCdd6e8PfSKgTkuPfM9kzuEMF6wzmQasFNEeFLW6in1Dxwj5bix5Z5CHzF7xfKMbC98sUkLqRVopKuleANeHEON2v1FKTWDPsNE3/7S67t+33dMD7IT6CvHb/XV/EfDr3UMiy+UgG+OWn4NZFayq9W0DDX9Osej3ICs9t8KD28hQ6XEejUrE+3mu0Nmd+a9xy1dq46+JxCZH74Va7UH0+sgk7D01vxAkH4t9bRj2VvjM1rvHENEFvEjW317aTYJmrrYqXbgzdeD/h4/4hNQbPgEMvu/TK2xcGpChHrW+dixcGL4PVKvAz6adDaO+jXQB0kdoeTu16Df6jnWDg7AEeZdGnnheAN2kHkZHnOHR+CAVzUr6zk0YAdFz7IdJ8mXOL4NhY+DsZhPC7Y8fPN+nplg3YzDyCh9s7oCo3uKZK8d12Fw2bnsy9Na9Iai8N34WvRqq6Z/uIvN7bNiwQu5dbk1ouzrd5pcbhERvRhfl0shp/RbOJp0l1DMMRZeaYscZric6UGznmcamoAh+bifPs1FFNq/QRZv6D7e0H28oft4Q/f5PwyjWZM48WWxJf8A9rRz7lczXCIAAAAASUVORK5CYII=" }} />
                                        <Body>
                                            <Text>{item.groupData.newGroupVal}</Text>
                                            <Text note>{
                                                item.currentUser.phoneNumber}</Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Body>
                                            <View style={styles.CardButtun} >
                                                <TouchableOpacity
                                                    onPress={this.rejectRequest.bind(this, item, index)}
                                                    activeOpacity={0.8} style={styles.rejectButt}>
                                                    <Text style={styles.rejectText}>
                                                        Reject
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={this.apprroveRequest.bind(this, item, index)}
                                                    style={styles.aprovButt} >
                                                    <Text style={styles.aprovText} >
                                                        Approve
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Body>
                                    </Right>
                                </CardItem>
                            </Card>
                        }
                        keyExtractor={(item) => {
                            console.log(item)
                            return item.key
                        }} />
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
        request_list: state.root,
        currentUser: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        requestList: (data) => {
            dispatch(requestList(data))
        },
        groupListAction: (data) => {
            dispatch(groupListAction(data))
        },
    };
};


export default connect(mapStateToProp, mapDispatchToProp)(RequestList)