import React, { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { secondsRemaining, dispatch } = useQuiz();
  const minutes: number = Math.floor(secondsRemaining / 60);
  const seconds: number = secondsRemaining % 60;

  useEffect(
    function () {
      const timer = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(timer);
    },
    [dispatch],
  );

  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes} : {seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
