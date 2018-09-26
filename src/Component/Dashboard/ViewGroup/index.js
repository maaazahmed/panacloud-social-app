import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Right,
    Header,
    Icon
} from 'native-base';
import { connect } from "react-redux"




class ViewGroup extends Component {
    constructor() {
        super()
        this.state = {
            count: 15
        }
    }

    render() {
        return (
            <View>
                <View style={styles.GroupListContainer} >
                    <Header>
                        <Right>
                            <Icon name="arrow-back"
                                style={{ color: "#fff" }} />
                        </Right>
                    </Header>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    GroupListContainer: {
        backgroundColor: "#fff"
    },
});






const mapStateToProp = (state) => {
    return ({
        ViewGroupData: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {};
};
export default connect(mapStateToProp, mapDispatchToProp)(ViewGroup)