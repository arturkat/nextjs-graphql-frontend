import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import paymentReducer from "./paymentModalSlice";
import toasterReducer from "./toasterSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    payment: paymentReducer,
    toaster: toasterReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
