//import React from 'react';

import { questionData } from "../../types";
import React from "react";

type optionProps = {
  question: questionData;
  answer: number | null;
  dispatch: React.Dispatch<any>;
};

function Options({ question, answer, dispatch }: optionProps) {
  const hasAnswered: boolean = answer !== null;

  return (
    <div className="options">
      {question.options.map((option: string, index: number) => {
        return (
          <button
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            className={`btn btn-option ${answer === index ? "answer" : ""} ${hasAnswered ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
            disabled={hasAnswered}
            key={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
