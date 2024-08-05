//JUST FOR LEARNING REDUX
import { createStore } from "redux";

console.log("Redux initial state");

type initialState = {
  balance: number;
  loan: number;
  loanPurpose: string;
};
const initialState: initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

type actionReducer =
  | {
      type: "account/deposit";
      payload: number;
    }
  | {
      type: "account/withdraw";
      payload: number;
    }
  | {
      type: "account/requestLoan";
      payload: {
        loan: number;
        purpose: string;
      };
    }
  | {
      type: "account/payLoan";
    };

function reducer(state: initialState = initialState, action: actionReducer) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.loan,
        loan: action.payload.loan,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);
store.dispatch({ type: "account/deposit", payload: 700 });
console.log(store.getState());

store.dispatch({ type: "account/withdraw", payload: 300 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { loan: 1000, purpose: "Buy laptop" },
});
console.log(store.getState());

store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
