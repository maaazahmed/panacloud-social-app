import React from "react";
import { Provider } from "react-redux"
import { CreateAccount, VeryfiAccount, DashboardMain } from "./Component/index";
import { StackNavigator } from "react-navigation"
import store from "./store/index"


const Route = StackNavigator(
    {
        CreateAccount: {
            screen: CreateAccount
        },
        Dashboard: {
            screen: DashboardMain
        },
        VeryfiAccount: {
            screen: VeryfiAccount
        },
    },
    {
        navigationOptions: {
            header: null
        },
    })






const Main = () => (
    <Provider store={store} >
        <Route />
    </Provider>
)
export default Main