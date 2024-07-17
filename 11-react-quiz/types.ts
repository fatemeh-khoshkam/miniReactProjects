type questionData = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type initialStateReducer = {
  questions?: questionData[];
  status: "loading" | "ready" | "error" | "active";
  index: number;
};

type actionReducer = {
  type: string;
  payload?: questionData[];
};

// enum typeOfAction {
//   "dataRecieved" = "dataRecieved",
//   "dataFailed" = "dataError",
//   "active" = "active",
// }

export type { initialStateReducer, actionReducer, questionData };
