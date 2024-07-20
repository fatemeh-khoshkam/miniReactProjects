//import React from 'react';
type finishPropsType = {
  points: number;
  maxPoints: number;
};

function Finish({ points, maxPoints }: finishPropsType) {
  const percentage: number = Math.ceil((points / maxPoints) * 100);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <p className="result">
      <span>{emoji}</span>
      You scored <strong>{points}</strong> out of {maxPoints} ({percentage}%)
    </p>
  );
}

export default Finish;
