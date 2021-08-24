import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Account } from 'models';

export interface AccountState {
  loading: boolean;
  list: Account[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: AccountState = {
  loading: false,
  list: [],
  filter: {
    // _page: 1,
    // _limit: 20,
  },
  pagination: {
    _page: 1,
    _limit: 10,
    _totalRows: 20,
  }
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    fetchAccountList: (state, action: PayloadAction<ListParams>) => {
      state.loading = true
    },
    fetchAccountListSuccess: (state, action: PayloadAction<ListResponse<Account>>) => {
      state.list = action.payload.data
      state.pagination = action.payload.pagination
      state.loading = false
    },
    fetchAccountListFailed: (state, action: PayloadAction<string>) => {
      state.loading = false
    },

    setFilter: (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload
    }
  },
});
// actions
export const accountActions = accountSlice.actions;
// selectors
export const selectAccountList = (state: RootState) => state.account.list;
export const selectAccountListLoading = (state: RootState) => state.account.loading;
export const selectAccountListFilter = (state: RootState) => state.account.filter;
export const selectAccountListPagination = (state: RootState) => state.account.pagination;
export const selectAccountMap = createSelector(selectAccountList, (accountList) =>
  accountList?.reduce((map: {[key: string]: Account}, account) => {
    map[account.customerId] = account
    return map
  }, {})
)

// reducer
export const accountReducer = accountSlice.reducer;

export default accountReducer;