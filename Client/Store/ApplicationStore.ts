import * as models from '../Api/models';

export interface ApplicationState {
    notes: NotesState,
    user: UserState,
    sign: SignState
}

export interface UserState {
    user: User,
    isLogged: boolean
}

export interface User {
    firstName: string,
    lastName: string,
    email: string,
}

export interface NotesState {
    notes: models.NotesData[],
    filter: models.NotesFilter
    isLoading: boolean,
}

export interface IdAndName<I,N> {
    id: I,
    name: N
}

export interface SignState {
    isMySignSelected: boolean,
    signs: string[],
    selectedSign: Sign
}

export interface Sign {
    toSign: IdAndName<string, string>[],
    signed: IdAndName<string, string>[],
    owner: IdAndName<string, string>,
    manifest: string
}

