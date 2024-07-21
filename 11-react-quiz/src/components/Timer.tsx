import React, { useEffect } from "react";
import { actionReducer } from "../../types";

type timerPropsType = {
  secondsRemaining: number;
  dispatch: React.Dispatch<actionReducer>;
};

function Timer({ secondsRemaining, dispatch }: timerPropsType) {
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
