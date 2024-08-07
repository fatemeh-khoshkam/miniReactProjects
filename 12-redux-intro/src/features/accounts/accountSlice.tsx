import { Dispatch } from "react";
import { Action } from "redux";

export type initialStateAccount = {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
};
const initialStateAccount: initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
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
    }
  | {
      type: "account/convertingCurrency";
    };

export default function reducerAccount(
  state: initialStateAccount = initialStateAccount,
  action: actionReducerAccount,
) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) {
        alert(`You have active loan!
you should first pay loan.`);
        return state;
      }
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
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function deposit(amount: number, currency: string) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch: any): Promise<void> {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`,
    );
    const data = await res.json();
    const converted: number = data.rates.USD;
    console.log(converted);
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount: number): actionReducerAccount {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(
  amount: number,
  purpose: string,
): actionReducerAccount {
  return {
    type: "account/requestLoan",
    payload: { loan: amount, purpose: purpose },
  };
}

export function payLoan(): actionReducerAccount {
  return { type: "account/payLoan" };
}
