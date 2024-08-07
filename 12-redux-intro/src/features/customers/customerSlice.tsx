export type initialStateCostumer = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};
const initialStateCostumer: initialStateCostumer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

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

export default function reducerCustomer(
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

export function createCustomer(
  fullName: string,
  ID: string,
): actionReducerCustomer {
  return {
    type: "customer/createCustomer",
    payload: { fullName: fullName, nationalID: ID },
  };
}

export function updateName(updatedName: string): actionReducerCustomer {
  return {
    type: "customer/updateName",
    payload: updatedName,
  };
}
