import { configureStore } from "@reduxjs/toolkit";
import reducerAccount from "./features/accounts/accountSlice";
import reducerCustomer from "./features/customers/customerSlice";

console.log("Redux initial state");

const store = configureStore({
  reducer: {
    account: reducerAccount,
    customer: reducerCustomer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
