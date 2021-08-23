import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Customer } from "models/customer";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentCustomer?: Customer;
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentCustomer: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true
    },
    loginSuccess(state, action: PayloadAction<Customer>) {
      state.logging = false
      state.currentCustomer = action.payload
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false
    },
    logout(state) {
      state.isLoggedIn = false
      state.currentCustomer = undefined
    },
  }
})

// Action
export const authActions = authSlice.actions;

// Selector
export const selectIsLoggedIn = (state:RootState) => state.auth.isLoggedIn
export const selectLogging = (state:RootState) => state.auth.logging

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
