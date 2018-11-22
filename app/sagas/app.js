import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import AppActions from '../actions/app';

export function* loginRequest(api, action) {
  const { payload } = action;
  // const response = yield api.loginByEmail(payload);

  // if (response.ok) {
  //   yield put(AppActions.loginSuccess(response.data));
  //   yield put(push('/dashboard'))
  // } else {
  //   yield put(AppActions.loginFailure())
  // }
  yield put(push('/dashboard'));
}
