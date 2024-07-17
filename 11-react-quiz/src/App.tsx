import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import { initialStateReducer, actionReducer, questionData } from "../types";

const BASE_URL = "http://localhost:4000";

function App() {
  const initialState: initialStateReducer = {
    questions: [],
    // 'loading' , 'error'
    status: "loading",
  };

  enum typeOfAction {
    "dataRecieved" = "dataRecieved",
    "dataError" = "dataError",
  }

  function reducer(
    state: initialStateReducer,
    action: actionReducer,
  ): initialStateReducer {
    switch (action.type) {
      case typeOfAction.dataRecieved:
        return { ...state, questions: action.payload, status: "ready" };
      case typeOfAction.dataError:
        return { ...state, status: "error" };
      default:
        throw new Error("Unrecognized action");
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res: Response = await fetch(`${BASE_URL}/questions`);
        const data: questionData[] = await res.json();

        console.log(data);

        dispatch({ type: typeOfAction.dataRecieved, payload: data });
      } catch (err) {
        if (err instanceof TypeError) {
          console.log("🌐 Please check your internet connection.");
        } else if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("An unknown error occurred.");
        }
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      {/*<DateCounter />*/}
      <Header />

      <Main>
        <p>1 / 15</p>
        <p>Questions ?</p>
      </Main>
    </div>
  );
}

export default App;
