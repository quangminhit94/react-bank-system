import accountSaga from 'features/account/accountSaga'
import { authSaga } from 'features/auth/authSaga'
import citySaga from 'features/city/citySaga'
import counterSaga from 'features/counter/counterSaga'
import customerSaga from 'features/customer/customerSaga'
import dashboardSaga from 'features/dashboard/dashboardSaga'
import { all } from 'redux-saga/effects'

// function log(action: PayloadAction) {
//   console.log('log action: ', action)
// }

export default function* rootSaga() {
  console.log('root Saga')
  // yield takeEvery('*', log)
  yield all([
    counterSaga(),
    authSaga(),
    dashboardSaga(),
    citySaga(),
    customerSaga(),
    accountSaga(),
  ])
}