import React from "react";
import "./App.css";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";

import store from "./store";
import {
  deposit,
  withdraw,
  requestLoan,
  payLoan,
} from "./features/accounts/accountSlice";
import { createCustomer, updateName } from "./features/customers/customerSlice";

function App() {
  store.dispatch(deposit(700));
  console.log(store.getState());

  store.dispatch(withdraw(300));
  console.log(store.getState());

  store.dispatch(requestLoan(1500, "Buy Laptop :)"));
  console.log(store.getState());

  store.dispatch(payLoan());
  console.log(store.getState());

  store.dispatch(createCustomer("Fati", "22412"));
  console.log(store.getState());

  store.dispatch(updateName("HANA"));
  console.log(store.getState());

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      <CreateCustomer />
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
