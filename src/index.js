import React from "react";
import { Provider } from "react-redux"
import {
    CreateAccount,
    VeryfiAccount,
    DashboardMain,
    UserDashboardMain,
    SplashScreen,
    TestComonent,
    SubAdminDashboard
} from "./Component/index";
import { StackNavigator } from "react-navigation"
import store from "./store/index"


const Route = StackNavigator(
    {
        SplashScreen: {
            screen: SplashScreen
        },
        TestComonent: {
            screen: TestComonent
        },
        SubAdminDashboard: {
            screen: SubAdminDashboard
        },
        CreateAccount: {
            screen: CreateAccount
        },
        UserDashboardMain: {
            screen: UserDashboardMain
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