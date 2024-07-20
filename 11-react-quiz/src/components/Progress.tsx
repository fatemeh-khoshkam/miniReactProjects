//import React from 'react';

type progressPropsType = {
  index: number;
  numQuestions: number;
  points: number;
  maxPoints?: number;
  answer: number | null;
};

function Progress({
  index,
  numQuestions,
  points,
  maxPoints,
  answer,
}: progressPropsType) {
  // For checking the user to know if answered or not
  // If answered then convert to number, it's 1 and when user clicks the progress bar colored
  const chkAnswer: boolean = answer !== null;

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(chkAnswer)}></progress>
      <p>
        Question <strong>{index}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
