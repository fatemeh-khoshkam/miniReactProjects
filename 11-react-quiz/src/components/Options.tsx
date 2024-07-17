//import React from 'react';

import { questionData } from "../../types";

type optionProps = {
  question: questionData;
};

function Options({ question }: optionProps) {
  return (
    <div className="options">
      {question.options.map((option) => {
        return (
          <button className="btn btn-option" key={option}>
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
