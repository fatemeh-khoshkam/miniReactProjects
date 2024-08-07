//JUST FOR LEARNING REDUX
import {
  applyMiddleware,
  combineReducers,
  createStore,
  AnyAction,
  Reducer,
} from "redux";
import reducerAccount, {
  initialStateAccount,
} from "./features/accounts/accountSlice";
import reducerCustomer, {
  initialStateCostumer,
} from "./features/customers/customerSlice";
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

console.log("Redux initial state");

export interface RootState {
  account: initialStateAccount;
  customer: initialStateCostumer;
}

const rootReducer = combineReducers({
  account: reducerAccount,
  customer: reducerCustomer,
});
//@ts-ignore
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

// Use typeof store.getState to infer the RootState type
export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>;

export default store;
