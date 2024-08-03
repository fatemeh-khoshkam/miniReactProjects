import Options from "./Options";
import React from "react";
import { useQuiz } from "../contexts/QuizContext";

function Question() {
  const { questions, index, answer, dispatch } = useQuiz();

  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
}

export default Question;
