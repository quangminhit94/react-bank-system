import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Transaction, Customer } from "models";

export interface DashboardStatistics {
  // Customer
  maleCount: number;
  femaleCount: number;
  highScoreCount: number;
  lowScoreCount: number;
  // account
  
  // transaction

}

export interface RankingTransactionByAccountList {
  accountId: number | string;
  accountNumber: string;
  rankingTransactionList: Transaction[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestCustomerList: Customer[];
  lowestCustomerList: Customer[];
  rankingTransactionByAccountList: RankingTransactionByAccountList[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highScoreCount: 0,
    lowScoreCount: 0,
  },
  highestCustomerList: [],
  lowestCustomerList: [],
  rankingTransactionByAccountList: [],
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true
    },
    fetchDataSuccess(state) {
      state.loading = false
    },
    fetchDataFailed(state) {
      state.loading = false
    },

    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload
    },
    setHighestCustomerList(state, action: PayloadAction<Customer[]>) {
      state.highestCustomerList = action.payload
    },
    setLowestCustomerList(state, action: PayloadAction<Customer[]>) {
      state.lowestCustomerList = action.payload
    },
    setRankAccountingByTransactionAmountList(state, action: PayloadAction<RankingTransactionByAccountList[]>) {
      state.rankingTransactionByAccountList = action.payload
    },
  }
})

// Action
export const dashboardActions = dashboardSlice.actions;

// Selector
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics
export const selectHighestCustomerList = (state: RootState) => state.dashboard.highestCustomerList
export const selectLowestCustomerList = (state: RootState) => state.dashboard.lowestCustomerList
export const selectRankingTransactionByAccountList = (state: RootState) => state.dashboard.rankingTransactionByAccountList

// Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
