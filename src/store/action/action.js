import ActionTypes from "../constant/constant"
import firebase from "react-native-firebase";

export const signInAction = (data, props) => {
    return dispatch => {
        firebase.auth().signInWithPhoneNumber(data)
            .then((confirmResult) => {
                console.log(confirmResult)
                props.navigation.navigate("VeryfiAccount")
                dispatch({
                    type: ActionTypes.CONFERM_RESULT,
                    payload: confirmResult
                })
            })
            .catch(error => {
                alert(error.message)
            });
    }
}



export const confirmResultAction = (data, props) => {
    return dispatch => {
        console.log(data.confirmResult,"==========")
        // confirmResult.confirm(codeInput)
        //     .then((user) => {
        //         console.log(message, 'Code Confirmed!')
        //         this.props.navigation.navigate("Dashboard")
        //     })
        //     .catch((error) => {
        //         console.log(message, 'Code Confirmed!')
        //     });

    }
}

