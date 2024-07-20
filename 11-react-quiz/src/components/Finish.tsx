//import React from 'react';
type finishPropsType = {
  points: number;
  maxPoints: number;
};

function Finish({ points, maxPoints }: finishPropsType) {
  const percentage: number = Math.ceil((points / maxPoints) * 100);
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of {maxPoints} ({percentage}%)
    </p>
  );
}

export default Finish;
