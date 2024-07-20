//import React from 'react';

type progressPropsType = {
  index: number;
  numQuestions: number;
  points: number;
};

function Progress({ index, numQuestions, points }: progressPropsType) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index}></progress>
      <p>
        Question <strong>{index}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/ X
      </p>
    </header>
  );
}

export default Progress;
