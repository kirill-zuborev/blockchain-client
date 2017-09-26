import { Action, handleActions, ReducerMap } from 'redux-actions';
import { AuthTypes } from '../Actions/AuthAction'
import { User, UserState } from '../Store/ApplicationStore';
import * as models from '../Api/models';

export const authReducer = (initialState: UserState) => {
    const reducerMap: ReducerMap<UserState, User> = {
        [AuthTypes.LOGIN_SUCCESS]: (state: UserState, action: Action<string>): UserState => {
            //history.pushState(state, 'LOGIN_SUCCESS', '/');

            return Object.assign({}, state, {
                isLogged: true,
                user: {
                    email: action.payload
                }
            } as UserState);
        },
        [AuthTypes.LOGIN_ERROR]: (state: UserState, action: Action<Error>): UserState => {
            return Object.assign({}, state, {
            } as UserState);
        },
        [AuthTypes.LOGIN_REQUEST]: (state: UserState, action: Action<User>): UserState => {
            return state;
        },

        [AuthTypes.REGISTER_SUCCESS]: (state: UserState, action: Action<string>): UserState => {
            return Object.assign({}, state, {
                isLogged: true,
                user: {
                    email: action.payload
                }
            } as UserState);
        },
        [AuthTypes.REGISTER_ERROR]: (state: UserState, action: Action<Error>): UserState => {
            return state;
        },
        [AuthTypes.REGISTER_REQUEST]: (state: UserState, action: Action<User>): UserState => {
            return state;
        },

        [AuthTypes.LOGOUT]: (state: UserState, action: Action<{}>): UserState => {
            //history.pushState(state, 'LOGOUT', '/');
            sessionStorage.removeItem("accessToken");

            return Object.assign({}, state, {
                isLogged: false,
                user: null
            } as UserState);
        }
    }

    return handleActions<UserState, User>(reducerMap, initialState);
}

