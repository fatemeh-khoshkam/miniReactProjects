import React from "react";

type nextButtonProps = {
  dispatch: React.Dispatch<any>;
  answer: number | null;
  numQuestions: number;
  index: number;
};

function NextButton({
  dispatch,
  answer,
  numQuestions,
  index,
}: nextButtonProps) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
      Finish
    </button>
  );
}

export default NextButton;
