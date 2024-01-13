import {SET_CURRENT_USER} from '../actionTypes';

const DEFAULT_STATE = {
    isAuthenticated : false ,
    user: {}
};

export default (state = DEFAULT_STATE , action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                // double complement as it reture the original value in boolean form
                isAuthenticated : !!Object.keys(action.user).length ,
                user : action.user
            }

        default:
            return state;
    }
};