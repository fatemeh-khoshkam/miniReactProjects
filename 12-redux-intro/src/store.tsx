//JUST FOR LEARNING REDUX
import { combineReducers, createStore } from "redux";

console.log("Redux initial state");

type initialStateAccount = {
  balance: number;
  loan: number;
  loanPurpose: string;
};
const initialStateAccount: initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

type initialStateCostumer = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};

const initialStateCostumer: initialStateCostumer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

type actionReducerAccount =
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

function reducerAccount(
  state: initialStateAccount = initialStateAccount,
  action: actionReducerAccount,
) {
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

type actionReducerCustomer =
  | {
      type: "customer/createCustomer";
      payload: {
        fullName: string;
        nationalID: string;
      };
    }
  | {
      type: "customer/updateName";
      payload: string;
    };

function reducerCustomer(
  state: initialStateCostumer = initialStateCostumer,
  action: actionReducerCustomer,
) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: new Date().toISOString(),
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

function deposit(amount: number): actionReducerAccount {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount: number): actionReducerAccount {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount: number, purpose: string): actionReducerAccount {
  return {
    type: "account/requestLoan",
    payload: { loan: amount, purpose: purpose },
  };
}

function payLoan(): actionReducerAccount {
  return { type: "account/payLoan" };
}

function createCustomer(fullName: string, ID: string): actionReducerCustomer {
  return {
    type: "customer/createCustomer",
    payload: { fullName: fullName, nationalID: ID },
  };
}

function updateName(updatedName: string): actionReducerCustomer {
  return {
    type: "customer/updateName",
    payload: updatedName,
  };
}

const rootReducer = combineReducers({
  account: reducerAccount,
  customer: reducerCustomer,
});

const store = createStore(rootReducer);
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
