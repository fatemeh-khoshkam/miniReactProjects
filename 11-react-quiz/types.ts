import React from "react";

type questionData = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

type initialStateReducer = {
  questions: questionData[];
  status: "loading" | "ready" | "error" | "active" | "finished";
  index: number;
  answer: null | number;
  points: number;
  highScore: number;
  secondsRemaining: number;
};

type actionReducer =
  | { type: "dataReceived"; payload: questionData[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number | null }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };

// type actionReducer = {
//   type: string;
//   payload?: questionData[];
// };

// enum typeOfAction {
//   "dataRecieved" = "dataRecieved",
//   "dataFailed" = "dataError",
//   "active" = "active",
// }

export type { initialStateReducer, actionReducer, questionData };
