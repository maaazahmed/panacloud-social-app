import { createBottomTabNavigator } from "react-navigation"
import GroupList from "./GroupList/index"
import RequestList from "./RequestList"


const Dashboard = createBottomTabNavigator({
    Group: { screen: GroupList },
    RequestList: { screen: RequestList },
},
    {
        tabBarOptions: {
            activeTintColor: '#3f51b5',
            inactiveTintColor: "#fff",
            activeBackgroundColor: "#fff",
            style: {
                backgroundColor: '#3f51b5',
            },
            labelStyle: {
                fontSize: 18,
                alignContent: "flex-start",
                paddingBottom: 10
            }
        }
    }
)


export default Dashboard