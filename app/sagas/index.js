import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import API from '../utils/api';

import { AppTypes } from '../actions/app';

import { loginRequest } from './app';

const api = API.create();

export default function* root() {
  yield all([takeLatest(AppTypes.LOGIN_REQUEST, loginRequest, api)]);
}
