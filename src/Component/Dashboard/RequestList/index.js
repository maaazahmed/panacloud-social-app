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




export default class RequestList extends Component {
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
                        <FlatList
                            onScroll={() => { this.setState({ count: this.state.count + 3 }) }}
                            data={arr}
                            renderItem={({ item, index }) =>
                                <Card key={index} style={styles.Card}>
                                    <CardItem>
                                        <Left>
                                            <Thumbnail source={{ uri: "https://scontent.fkhi4-1.fna.fbcdn.net/v/t1.0-9/22279707_282900065546139_3654734220274300235_n.jpg?_nc_cat=0&_nc_eui2=AeHRdlM8eqDcyXmtWKac6uJUh8LA5ViKlAMp9dWzSSuc7Y8KO6GMgjjKiqR_Gojei24gRRZcq8TTWxqbFjmVGucO2bwtzjEegT2RH5IJSpAMl43qsJPq-u3o65hZI3-Smpk&oh=57a8afb496dcfcca9e8f13ec36bed700&oe=5C2CA1EA" }} />
                                            <Body>
                                                <Text>{item.GroupName}</Text>
                                                <Text note>People</Text>
                                            </Body>
                                        </Left>
                                        <Right>
                                            <Body>
                                                <View style={styles.CardButtun} >
                                                    <TouchableOpacity

                                                        activeOpacity={0.8} style={styles.rejectButt}>
                                                        <Text style={styles.rejectText}>
                                                            Reject
                                                </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity

                                                        activeOpacity={0.8}
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
                            keyExtractor={(item) => { return item.key }}/>
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
