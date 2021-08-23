import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import accountReducer from 'features/account/accountSlice';
import authReducer from 'features/auth/authSlice';
import cityReducer from 'features/city/citySlice';
import customerReducer from 'features/customer/customerSlice';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils/history';
import counterReducer from '../features/counter/counterSlice';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  city: cityReducer,
  customer: customerReducer,
  account: accountReducer,
})

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history))
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
