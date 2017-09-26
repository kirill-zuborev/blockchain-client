import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { NotesState, IdAndName } from '../Store/ApplicationStore';
import { SignApi } from '../api/SignApi';
import { push } from 'react-router-redux';
import * as models from '../Api/models';
import { Sign, SignState } from '../Store/ApplicationStore';

const CREATE_REQUEST = 'CREATE_REQUEST';
const CREATE_SUCCESS = 'CREATE_SUCCESS';
const CREATE_ERROR = 'CREATE_ERROR';

const GET_SIGNS_REQUEST = 'GET_SIGNS_REQUEST';
const GET_SIGNS_SUCCESS = 'GET_SIGNS_SUCCESS';
const GET_SIGNS_ERROR = 'GET_SIGNS_ERROR';

const GET_SIGN_REQUEST = 'GET_SIGN_REQUEST';
const GET_SIGN_SUCCESS = 'GET_SIGN_SUCCESS';
const GET_SIGN_ERROR = 'GET_SIGN_ERROR';

const DOWNLOAD_DOCUMENT = 'DOWNLOAD_DOCUMENT';

const createRequest = createAction(CREATE_REQUEST, (form: FormData) => form);
const createSuccess = createAction(CREATE_SUCCESS, (manifest: string) => manifest);
const createError = createAction(CREATE_ERROR, () => { });

const getSignsRequest = createAction(GET_SIGNS_REQUEST, () => { });
const getSignsSuccess = createAction(GET_SIGNS_SUCCESS, (signs: string[]) => signs);
const getSignsError = createAction(GET_SIGNS_ERROR, () => { });

const getSignRequest = createAction(GET_SIGN_REQUEST, () => { });
const getSignSuccess = createAction(GET_SIGN_SUCCESS, (signState: SignState) => signState);
const getSignError = createAction(GET_SIGN_ERROR, () => { });

const downloadDocument = createAction(DOWNLOAD_DOCUMENT, (manifest: string) => manifest);

const create = (form: FormData) => (dispatch: Dispatch<models.SignModel>) => {
    dispatch(createRequest(form));

    SignApi.create(form)
        .then((response: Response) => {
            if (response.status == 200) {
                response.json().then(val => {
                    console.log(val, "create Action");

                    dispatch(createSuccess(val));
                })
            } else if (response.status == 400) {
                dispatch(createError());
            }
        })
        .catch((e: Error) => console.log(e));
};

const getSigns = (isMySign: boolean) => (dispatch: Dispatch<models.SignModel>) => {
    dispatch(getSignsRequest());

    SignApi.getSigns()
        .then((response: Response) => {
            if (response.status == 200) {
                response.json().then(val => {
                    console.log(val, "getSigns Action");

                    dispatch(getSignsSuccess(val));
                });
            } else if (response.status == 400) {
                dispatch(getSignsError());
            }
        })
        .catch((e: Error) => console.log(e));
};

const getSign = (manifest: string) => (dispatch: Dispatch<models.SignModel>) => {
    dispatch(getSignRequest());

    SignApi.getSign(manifest)
        .then((response: Response) => {
            if (response.status == 200) {
                response.json().then(val => {
                    console.log(val, "getSign Action");

                    dispatch(getSignSuccess(val));
                });
            } else if (response.status == 400) {
                dispatch(getSignError());
            }
        })
        .catch((e: Error) => console.log(e));
};

const download = (manifest: string) => (dispatch: Dispatch<models.SignModel>) => {
    SignApi.download(manifest)
        .then((response: Response) => {
            if (response.status == 200) {
                dispatch(downloadDocument(manifest));
            }
        })
        .catch((e: Error) => console.log(e));
};

export const SignActionTypes = {
    CREATE_REQUEST,
    CREATE_SUCCESS,
    CREATE_ERROR,
    GET_SIGNS_REQUEST,
    GET_SIGNS_SUCCESS,
    GET_SIGNS_ERROR,
    GET_SIGN_REQUEST,
    GET_SIGN_SUCCESS,
    GET_SIGN_ERROR,
    DOWNLOAD_DOCUMENT
};

export const SignAction = {
    create: create,
    getSigns: getSigns,
    getSign: getSign,
    download: download
};