import { userConstants } from '../_constants/userConstants';
import isEmpty from '../_utils/isObjectEmpty';

const initState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initState, action) {
    switch (action.type) {
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case userConstants.SET_CURRENT_USER:
            return {
                ...state, //return the current state
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}