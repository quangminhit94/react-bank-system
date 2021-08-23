
import { PayloadAction } from "@reduxjs/toolkit"
import { push } from "connected-react-router"
import { call, delay, fork, put, take } from "redux-saga/effects"
import { authActions, LoginPayload } from "./authSlice"

function* handleLogin(payload: LoginPayload) {
  try {
    console.log('fake login delay 1s')
    yield delay(1000)
    console.log('handle login', payload)
    localStorage.setItem('access_token', 'fake_token')
    // login success
    yield put(authActions.loginSuccess({
      id: 1,
      name: 'Owen'
    }))
    // redirect admin page
    yield put(push('/admin/dashboard'))
  } catch (error) {
    yield put(authActions.loginFailed(error.message))
  }
}
function* handleLogout() {
  console.log('fake delay 1s')
  yield delay(1000)
  console.log('handle logout')
  localStorage.removeItem('access_token')
  // redirect login page
  yield put(push('/login'))
}

function* watchLoginFlow() {
  while(true) {
    console.log('watch login')
    const isLoggedIn = Boolean(localStorage.getItem('access_token'))
    if(!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type)
      yield fork(handleLogin, action.payload)
    }
  
    yield take(authActions.logout.type)
    yield call(handleLogout)
  }
}

export function* authSaga() {
  console.log('auth saga')
  yield fork(watchLoginFlow)
};
