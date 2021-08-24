import { PayloadAction } from "@reduxjs/toolkit";
import accountApi from "api/accountApi";
import { ListParams, ListResponse, Account } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { accountActions } from "./accountSlice";

function* fetchAccountList(action: PayloadAction<ListParams>) {
  try {
    console.log(action.payload);
    const responseList: ListResponse<Account> = yield call(accountApi.getAll, action.payload)
    yield put(accountActions.fetchAccountListSuccess(responseList))
  } catch (error) {
    console.log('Failed to fetch account list', error)
    yield put(accountActions.fetchAccountListFailed(error.messages))
  }
}

export default function* accountSaga() {
  yield takeLatest(accountActions.fetchAccountList, fetchAccountList)
}