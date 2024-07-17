//import React from 'react';
import { questionData } from "../../types";
import Options from "./Options";

type questionProps = {
  question: questionData;
};

function Question({ question }: questionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
