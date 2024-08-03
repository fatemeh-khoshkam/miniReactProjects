import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { actionReducer, initialStateReducer, questionData } from "../../types";

const BASE_URL = "http://localhost:4500";
const SEC_PER_QUESTION: number = 30;

const initialState: initialStateReducer = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
  maxPoints: 0,
  numQuestions: 0,
  dispatch: (() => {}) as React.Dispatch<actionReducer>,
};

function reducer(
  state: initialStateReducer,
  action: actionReducer,
): initialStateReducer {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions?.at(state.index);
      const correctAnswer = action.payload === question?.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: correctAnswer ? state.points + question.points : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unrecognized action");
  }
}

//type QuizContext = null | initialStateReducer

const QuizContext = createContext<null | initialStateReducer>(null);

function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state;

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res: Response = await fetch(`${BASE_URL}/questions`);
        const data: questionData[] = await res.json();

        console.log(data);

        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestions();
  }, []);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((pre, question) => {
    return pre + question.points;
  }, 0);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined || context === null) {
    throw new Error("QuizContext was used outside QuizProvider");
  }
  return context;
}

export { useQuiz, QuizProvider };
