import { PayloadAction } from "@reduxjs/toolkit";
import cityApi from "api/cityApi";
import { ListParams, ListResponse, City } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { cityActions } from "./citySlice";

function* fetchCityList1(action: PayloadAction<ListParams>) {
  try {
    const responseList: ListResponse<City> = yield call(cityApi.getAll, action.payload)
    yield put(cityActions.fetchCityListSuccess(responseList))
  } catch (error) {
    console.log('Failed to fetch city list', error)
    yield put(cityActions.fetchCityListFailed(error.messages))
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList, fetchCityList1)
}