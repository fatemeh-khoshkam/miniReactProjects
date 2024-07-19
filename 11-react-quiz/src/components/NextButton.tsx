import React from "react";

type nextButtonProps = {
  dispatch: React.Dispatch<any>;
  answer: number | null;
};

function NextButton({ dispatch, answer }: nextButtonProps) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}

export default NextButton;
