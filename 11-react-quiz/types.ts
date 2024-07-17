type questionData = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type initialStateReducer = {
  questions?: questionData[];
  status: "loading" | "ready" | "error";
};

type actionReducer = {
  type: string;
  payload?: questionData[];
};

export type { initialStateReducer, actionReducer, questionData };
