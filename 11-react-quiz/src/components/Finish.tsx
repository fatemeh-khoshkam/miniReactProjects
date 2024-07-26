import React from "react";
import { actionReducer } from "../../types";

type finishPropsType = {
  points: number;
  maxPoints: number;
  highScore: number;
  dispatch: React.Dispatch<actionReducer>;
};

function Finish({ points, maxPoints, highScore, dispatch }: finishPropsType) {
  const percentage: number = Math.ceil((points / maxPoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxPoints} ({percentage}%)
      </p>
      <p className="highscore">(High Score : {highScore} points)</p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Finish;