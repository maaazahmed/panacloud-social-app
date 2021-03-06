import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    confirmResult: {},
    currentUser: {},
    ViewGroup: {},
    ViewMesesage: {},
    groupList: [],
    requestList: [],
    messages: [],
    Allmessages: [],
    groupMemeber: [],
    myGroups: [],
    screenTitle: "Messages"
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.CONFERM_RESULT:
            return ({
                ...state,
                confirmResult: action.payload
            })
        case ActionTypes.GROUP_LIST:
            return ({
                ...state,
                groupList: action.payload
            })
        case ActionTypes.CURRENT_USER:
            return ({
                ...state,
                currentUser: action.payload
            })
        case ActionTypes.REQUEST_LIST:
            return ({
                ...state,
                requestList: action.payload
            })
        case ActionTypes.VIEW_GROUP:
            return ({
                ...state,
                ViewGroup: action.payload
            })
        case ActionTypes.MESSAGE_LIST:
            return ({
                ...state,
                messages: action.payload
            })
        case ActionTypes.ALL_MESSAGE:
            return ({
                ...state,
                Allmessages: action.payload
            })
        case ActionTypes.VIEW_MESSEGE:
            return ({
                ...state,
                ViewMesesage: action.payload
            })
        case ActionTypes.GET_MEMBER:
            return ({
                ...state,
                groupMemeber: action.payload
            })
        case ActionTypes.MY_GROUPS:
            return ({
                ...state,
                myGroups: action.payload
            })
        case ActionTypes.SCREEN_TITLE:
            return ({
                ...state,
                screenTitle: action.payload
            })
        default:
            return state;
    }
}
