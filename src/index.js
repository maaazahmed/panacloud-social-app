import React from "react";
import { Provider } from "react-redux"
import { CreateAccount, VeryfiAccount, Dashboard } from "./Component/index";
import { StackNavigator } from "react-navigation"


const Route = StackNavigator(
    {
        CreateAccount: {
            screen: CreateAccount
        },
        VeryfiAccount: {
            screen: VeryfiAccount
        },
        Dashboard: {
            screen: Dashboard
        },
    },
    {
        navigationOptions: {
            header: null
        }
    })






const Main = () => (
    <Route />
)


export default Main