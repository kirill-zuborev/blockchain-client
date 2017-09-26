import { combineReducers } from 'redux';
import { notesReducer } from './NotesReducer';
import { signReducer } from './SignReducer';
import { authReducer } from './AuthReducer';
import { ApplicationState, NotesState, IdAndName } from '../Store/ApplicationStore';
import { History } from 'history';
import { routerReducer } from 'react-router-redux';

export const reducers = (initialState: ApplicationState, history: History) => {
    const notes = notesReducer(initialState.notes);
    const sign = signReducer(initialState.sign);
    const auth = authReducer(initialState.user);
    const router = routerReducer;

    return combineReducers<ApplicationState>({
        notes,
        sign,
        user: auth,
        router
    });
}