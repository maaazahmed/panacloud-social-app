import React from "react";
import { Provider } from "react-redux"
import { CreateAccount, VeryfiAccount, DashboardMain, UserDashboardMain, SplashScreen } from "./Component/index";
import { StackNavigator } from "react-navigation"
import store from "./store/index"


const Route = StackNavigator(
    {
        SplashScreen:{
            screen: SplashScreen
        },
        CreateAccount: {
            screen: CreateAccount
        },
        Dashboard: {
            screen: DashboardMain
        },
        VeryfiAccount: {
            screen: VeryfiAccount
        },
        UserDashboardMain: {
            screen: UserDashboardMain
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