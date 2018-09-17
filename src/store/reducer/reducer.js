import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    confirmResult: {},
    groupList: [],
    currentUser: {}
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
        default:
            return state;
    }
}
