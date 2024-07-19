import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import { initialStateReducer, actionReducer, questionData } from "../../types";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import StartScreen from "./StartScreen";
import Question from "./Question";

const BASE_URL = "http://localhost:4500";

function App() {
  const initialState: initialStateReducer = {
    questions: [],
    // 'loading' , 'error' , 'ready' , 'active'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
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
        return { ...state, status: "active" };
      case "newAnswer":
        const question = state.questions?.at(state.index);
        const correctAnswer = action.payload === question?.correctOption;
        console.log(question);
        return {
          ...state,
          answer: action.payload,
          points: correctAnswer ? state.points + question.points : state.points,
        };
      default:
        throw new Error("Unrecognized action");
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  const { questions, status, index, answer } = state;

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

  const numQuestions = questions?.length;

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && numQuestions && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && numQuestions && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
