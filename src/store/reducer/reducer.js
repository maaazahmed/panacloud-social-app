import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    confirmResult: {},
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.CONFERM_RESULT:
            return ({
                ...state,
                confirmResult: action.payload
            })
        default:
            return state;
    }
}
