import { PayloadAction } from "@reduxjs/toolkit"
import { call, delay, put, takeLatest } from "redux-saga/effects"
import { incrementSaga, incrementSagaSuccess } from './counterSlice'


function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('waiting for 1s')
  yield call(delay, 1000)

  console.log('done, dispatch action')
  yield put(incrementSagaSuccess(action.payload))
}

export default function* counterSaga() {
  console.log('counter Saga')
  yield takeLatest(incrementSaga.toString(), handleIncrementSaga)
}