import React, { useEffect } from "react";

type timerPropsType = {
  secondsRemaining: number;
  dispatch: React.Dispatch<any>;
};

function Timer({ secondsRemaining, dispatch }: timerPropsType) {
  useEffect(
    function () {
      const timer = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(timer);
    },
    [dispatch],
  );

  return <div className="timer">{secondsRemaining}</div>;
}

export default Timer;
