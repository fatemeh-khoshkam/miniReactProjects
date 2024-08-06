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

export default function reducerAccount(
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

export function deposit(amount: number): actionReducerAccount {
  return { type: "account/deposit", payload: amount };
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
