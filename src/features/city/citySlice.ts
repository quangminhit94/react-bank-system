import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, City } from 'models';

export interface CityState {
  loading: boolean;
  list: City[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: CityState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  }
};
console.log('city slice');
export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList: (state, action: PayloadAction<ListParams>) => {
      console.log('test');
      state.loading = true
    },
    fetchCityListSuccess: (state, action: PayloadAction<ListResponse<City>>) => {
      state.list = action.payload.data
      state.pagination = action.payload.pagination
      state.loading = false
    },
    fetchCityListFailed: (state, action: PayloadAction<string>) => {
      state.loading = false
    },

    setFilter: (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload
    }
  },
});
// actions
export const cityActions = citySlice.actions;
// selectors
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityListLoading = (state: RootState) => state.city.loading;
export const selectCityListFilter = (state: RootState) => state.city.filter;
export const selectCityListPagination = (state: RootState) => state.city.pagination;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: {[key: string]: City}, city) => {
    map[city.id] = city
    console.log(map);
    return map
  }, {})
)
export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map(city => ({
    label: city.name,
    value: city.id
  }))
)

// reducer
export const cityReducer = citySlice.reducer;

export default cityReducer;