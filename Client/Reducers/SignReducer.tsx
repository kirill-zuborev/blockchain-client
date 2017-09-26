import { Action, handleActions, ReducerMap } from 'redux-actions';
import { SignActionTypes } from '../Actions/SignAction'
import * as models from '../Api/models';
import { Sign, SignState } from '../Store/ApplicationStore';

export const signReducer = (initialState: SignState) => {
    const reducerMap: ReducerMap<SignState, Sign> = {
        [SignActionTypes.CREATE_REQUEST]: (state: SignState, action: Action<{}>): SignState => {
            return state;
        },
        [SignActionTypes.CREATE_SUCCESS]: (state: SignState, action: Action<string>): SignState => {
            return state;
        },
        [SignActionTypes.CREATE_ERROR]: (state: SignState, action: Action<Error>): SignState => {
            return state;
        },

        [SignActionTypes.GET_SIGNS_REQUEST]: (state: SignState, action: Action<{}>): SignState => {
            return state;
        },
        [SignActionTypes.GET_SIGNS_SUCCESS]: (state: SignState, action: Action<string[]>): SignState => {
            return state;
        },
        [SignActionTypes.GET_SIGNS_ERROR]: (state: SignState, action: Action<Error>): SignState => {
            return state;
        },

        [SignActionTypes.GET_SIGN_REQUEST]: (state: SignState, action: Action<{}>): SignState => {
            return state;
        },
        [SignActionTypes.GET_SIGN_SUCCESS]: (state: SignState, action: Action<Sign>): SignState => {
            return state;
        },
        [SignActionTypes.GET_SIGN_ERROR]: (state: SignState, action: Action<Error>): SignState => {
            return state;
        },

        [SignActionTypes.DOWNLOAD_DOCUMENT]: (state: SignState, action: Action<{}>): SignState => {
            return state;
        }
    }

    return handleActions<SignState, Sign>(reducerMap, initialState);
}


