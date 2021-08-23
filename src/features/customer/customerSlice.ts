import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Customer } from 'models';

export interface CustomerState {
  loading: boolean;
  list: Customer[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: CustomerState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 10,
  },
  pagination: {
    _page: 1,
    _limit: 10,
    _totalRows: 20,
  }
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    fetchCustomerList: (state, action: PayloadAction<ListParams>) => {
      state.loading = true
    },
    fetchCustomerListSuccess: (state, action: PayloadAction<ListResponse<Customer>>) => {
      state.list = action.payload.data
      state.pagination = action.payload.pagination
      state.loading = false
    },
    fetchCustomerListFailed: (state, action: PayloadAction<string>) => {
      state.loading = false
    },

    setFilter: (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload
    },
    setFilterWithDebounce: (state, action: PayloadAction<ListParams>) => {}
  },
});
// actions
export const customerActions = customerSlice.actions;
// selectors
export const selectCustomerList = (state: RootState) => state.customer.list;
export const selectCustomerListLoading = (state: RootState) => state.customer.loading;
export const selectCustomerListPagination = (state: RootState) => state.customer.pagination;
export const selectCustomerListFilter = (state: RootState) => state.customer.filter;

// reducer
export const customerReducer = customerSlice.reducer;

export default customerReducer;