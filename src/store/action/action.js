import ActionTypes from "../constant/constant"
import firebase from "react-native-firebase";



const database = firebase.database().ref("/")
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



export const groupListAction = (data) => {
    return dispatch => {
        database.child("Groups").on("value", (snap)=>{
            console.log(snap.val(),"=============")
        })


    //    dispatch({
    //        type:ActionTypes,
    //        payload:
    //    })

    }
}

