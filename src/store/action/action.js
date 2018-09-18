import ActionTypes from "../constant/constant"
import firebase from "react-native-firebase";



const database = firebase.database().ref("/")
export const signInAction = (data, props) => {
    return dispatch => {
        firebase.auth().signInWithPhoneNumber(data)
            .then((confirmResult) => {
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



export const groupListAction = () => {
    return dispatch => {
        let groupsArr = []
        database.child("Groups").on("value", (snap) => {
            let obj = snap.val();
            for (let key in obj) {
                groupsArr.push({ ...obj[key], key })
            }
            console.log(groupsArr, "=============")
            dispatch({
                type: ActionTypes.GROUP_LIST,
                payload: groupsArr
            })
        })
    }
}



export const currentUserAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CURRENT_USER,
            payload: data
        })
    }
}



export const requestList = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.REQUEST_LIST,
            payload: data,
        })
    }
}





export const viewGroupAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.VIEW_GROUP,
            payload: data,
        })
    }
}



export const messageAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.MESSAGE_LIST,
            payload: data,
        })
    }
}

