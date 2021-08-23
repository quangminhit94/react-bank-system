import transactionApi from "api/transactionApi";
import customerApi from "api/customerApi";
import accountApi from "api/accountApi";
import { Account, ListResponse, Transaction, Customer } from "models";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { dashboardActions, RankingTransactionByAccountList } from "./dashboardSlice";

function* fetchStatistics() {
  const responseList: Array<ListResponse<Customer>> = yield all([
    call(customerApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(customerApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(customerApi.getAll, { _page: 1, _limit: 1, memberScore_gte: 8 }),
    call(customerApi.getAll, { _page: 1, _limit: 1, memberScore_lte: 5 }),
  ])

  const statisticList = responseList.map(x => x.pagination._totalRows)
  const [maleCount, femaleCount, highScoreCount, lowScoreCount] = statisticList
  yield put(dashboardActions.setStatistics({maleCount, femaleCount, highScoreCount, lowScoreCount}))
}
function* fetchHighestCustomerList() {
  const { data }: ListResponse<Customer> = yield call(customerApi.getAll, {
    _page: 1,
    _limit: 10,
    _sort: 'memberScore',
    _order: 'desc',
  })
  
  yield put(dashboardActions.setHighestCustomerList(data))
}
function* fetchLowestCustomerList() {
  const { data }: ListResponse<Customer> = yield call(customerApi.getAll, {
    _page: 1,
    _limit: 10,
    _sort: 'memberScore',
    _order: 'asc',
  })
  
  yield put(dashboardActions.setLowestCustomerList(data))
}
function* fetchRankingByTransactionAmountList() {
  // fetch accounts
  const { data: accountList }: ListResponse<Account> = yield call(accountApi.getAll, {
    _page: 1,
    _limit: 10
  })
  
  // fetch transactions
  const callList = accountList.map(x => call(transactionApi.getAll, {
    _page: 1,
    _limit: 10,
    _sort: 'amount',
    _order: 'desc',
    accountId: x.id
  }))

  const responseList: Array<ListResponse<Transaction>> = yield all(callList)
  const rankingByTransactionAmountList: Array<RankingTransactionByAccountList> = responseList.map((x, idx) => ({
    accountId: accountList[idx].id,
    accountNumber: accountList[idx].accountNumber,
    rankingTransactionList: x.data
  }))

  // update state
  yield put(dashboardActions.setRankAccountingByTransactionAmountList(rankingByTransactionAmountList));
}
function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestCustomerList),
      call(fetchLowestCustomerList),
      call(fetchRankingByTransactionAmountList),
    ])
    yield put(dashboardActions.fetchDataSuccess())
  } catch (error) {
    console.log('failed fetch dashboard data: ', error)
    yield put(dashboardActions.fetchDataFailed())
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData)
};
