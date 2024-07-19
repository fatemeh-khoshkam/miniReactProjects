//import React from 'react';
import { questionData } from "../../types";
import Options from "./Options";
import React from "react";

type questionProps = {
  question: questionData;
  answer: number | null;
  dispatch: React.Dispatch<any>;
};

function Question({ question, answer, dispatch }: questionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
