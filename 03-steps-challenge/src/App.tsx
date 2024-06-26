import React, { useState } from "react";
import "./style.css";

export default function App():React.JSX.Element {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

//This component gets step for example step:3, and you can count with that step,
//during this calculation the date is changed based on that count.
function Counter():React.JSX.Element  {
  const [step, setStep] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  //get date and add with count to receive true date
  const date:Date = new Date("Aug 23 2023");
  date.setDate(date.getDate() + count);

  //These functions take previous step and add or minus it.
  function calcStepForward():void {
    setStep((prevStep) => prevStep + 1);
  }
  function calcStepBack():void {
    setStep((prevStep) => prevStep - 1);
  }

  //These functions take previous count and calculate them with steps
  //Step : 3 ==> count : 0 - 3 = -3 ==> 3 days ago [with +3 ==> 3 days from today]
  function calcCountForward():void {
    setCount((prevCount) => prevCount + step);
  }
  function calcCountBack():void {
    setCount((prevCount) => prevCount - step);
  }
  return (
    <div>
      <div>
        <button onClick={calcStepBack}>-</button>
        <span>Step : {step}</span>
        <button onClick={calcStepForward}>+</button>
      </div>

      <div>
        <button onClick={calcCountBack}>-</button>
        <span>Count : {count}</span>
        <button onClick={calcCountForward}>+</button>
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
    </div>
  );
}
