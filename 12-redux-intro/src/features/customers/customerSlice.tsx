import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialState = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};
const initialState: initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName: string, nationalID: string) {
        return {
          payload: {
            fullName,
            nationalID,
          },
        };
      },

      reducer(
        state,
        action: PayloadAction<{ fullName: string; nationalID: string }>,
      ) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = new Date().toISOString();
      },
    },
    updateName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer } = customerSlice.actions;
export default customerSlice.reducer;
// type actionReducerCustomer =
//   | {
//       type: "customer/createCustomer";
//       payload: {
//         fullName: string;
//         nationalID: string;
//       };
//     }
//   | {
//       type: "customer/updateName";
//       payload: string;
//     };
//
// export default function reducerCustomer(
//   state: initialStateCostumer = initialStateCostumer,
//   action: actionReducerCustomer,
// ) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: new Date().toISOString(),
//       };
//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }
//
// export function createCustomer(
//   fullName: string,
//   ID: string,
// ): actionReducerCustomer {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName: fullName, nationalID: ID },
//   };
// }
//
// export function updateName(updatedName: string): actionReducerCustomer {
//   return {
//     type: "customer/updateName",
//     payload: updatedName,
//   };
// }
