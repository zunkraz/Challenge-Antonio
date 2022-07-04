import {
    USER_AUTH,
    SET_ORDER
} from './types';

const reduxState = {
    token:null,
    orders:null,
}
export default function (state = reduxState, action){
    switch (action.type) {
        case USER_AUTH:
        return {
            ...state,
            token:action.payload
        };
        case SET_ORDER:
            return {
                ...state,
                orders:action.payload
            };
        default:
        return {
            ...state
        }
    }
}

