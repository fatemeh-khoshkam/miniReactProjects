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

function deposit(amount: number): actionReducer {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount: number): actionReducer {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount: number, purpose: string): actionReducer {
  return {
    type: "account/requestLoan",
    payload: { loan: amount, purpose: purpose },
  };
}

function payLoan(): actionReducer {
  return { type: "account/payLoan" };
}

const store = createStore(reducer);
store.dispatch(deposit(700));
console.log(store.getState());

store.dispatch(withdraw(300));
console.log(store.getState());

store.dispatch(requestLoan(1500, "Buy Laptop :)"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
