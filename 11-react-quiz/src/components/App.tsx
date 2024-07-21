import React, { useEffect, useReducer } from "react";
import { initialStateReducer, actionReducer, questionData } from "../../types";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Footer from "./Footer";
import Timer from "./Timer";

const BASE_URL = "http://localhost:4500";

function App() {
  const initialState: initialStateReducer = {
    questions: [],
    // 'loading' , 'error' , 'ready' , 'active'
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: 10,
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
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && numQuestions && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && numQuestions && (
          <>
            <Progress
              points={points}
              numQuestions={numQuestions}
              index={index}
              maxPoints={maxPoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                index={index}
                numQuestions={numQuestions}
                dispatch={dispatch}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finish
            points={points}
            highScore={highScore}
            maxPoints={maxPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
