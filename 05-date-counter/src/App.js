import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date("Aug 23 2023");
  date.setDate(date.getDate() + count);

  function plusCounter() {
    setCount((preCount) => preCount + step);
  }
  function minusCounter() {
    setCount((preCount) => preCount - step);
  }
  function reset() {
    setStep(1);
    setCount(0);
  }

  return (
    <div>
      <div className="steps">
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => {
            setStep(Number(e.target.value));
          }}
        />
        <span>Step : {step}</span>
      </div>

      <div>
        <button onClick={minusCounter}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => {
            setCount(Number(e.target.value));
          }}
        ></input>
        <button onClick={plusCounter}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? ` ${count} days from today is `
            : ` ${-1 * count} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>

      {count !== 0 || step !== 1 ? (
        <button onClick={reset}>Reset</button>
      ) : null}
    </div>
  );
}
