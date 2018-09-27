import { errorConstants } from '../_constants/errorConstants'

const initState = {};

export default function (state = initState, action) {
    switch (action.type) {
        case errorConstants.GET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}