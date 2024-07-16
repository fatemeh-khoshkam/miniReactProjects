import { useReducer } from "react";
import React from "react";

function DateCounter() {
  type initialState = {
    step: number;
    count: number;
  };

  enum typeOfAction {
    "inc" = "increment",
    "dec" = "decrement",
    "reset" = "reset",
    "defineCount" = "defineCount",
    "defineStep" = "defineStep",
  }

  type action = {
    type: typeOfAction;
    payload?: number;
  };

  const initialState: initialState = {
    step: 1,
    count: 0,
  };

  function reducer(state: initialState, action: action) {
    switch (action.type) {
      case typeOfAction.inc:
        return { ...state, count: state.count + state.step };
      case typeOfAction.dec:
        return { ...state, count: state.count - state.step };
      case typeOfAction.defineCount:
        return { ...state, count: action.payload! };
      case typeOfAction.defineStep:
        return { ...state, step: action.payload! };
      case typeOfAction.reset:
        return initialState;
      default:
        throw new Error("Unrecognized action");
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, count } = state;
  console.log(state);

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: typeOfAction.dec });
  };

  const inc = function () {
    dispatch({ type: typeOfAction.inc });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: typeOfAction.defineCount,
      payload: Number(e.target.value),
    });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: typeOfAction.defineStep,
      payload: Number(e.target.value),
    });
  };

  const reset = function (): void {
    dispatch({ type: typeOfAction.reset });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
