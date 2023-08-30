import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  let tip = ((percentage1 + percentage2) / 2) * 0.01;
  let tipTotal = Number((tip * bill).toFixed(0));

  function reset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div className="App">
      <Bill bill={isNaN(bill) ? "" : bill} onPayBill={setBill}></Bill>
      <Select percentage={percentage1} onPercentage={setPercentage1}>
        How did you like the service ?
      </Select>
      <Select percentage={percentage2} onPercentage={setPercentage2}>
        How did your friend like the service ?
      </Select>
      {bill > 0 && (
        <>
          <OutPut bill={bill} tip={tipTotal}></OutPut>
          <Reset onReset={reset}></Reset>
        </>
      )}
    </div>
  );
}
function Bill({ bill, onPayBill }) {
  return (
    <div>
      <span>How much was the bill ?</span>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onPayBill(Number(e.target.value))}
      />
    </div>
  );
}
function Select({ children, percentage, onPercentage }) {
  return (
    <div>
      <span>{children}</span>
      <select
        value={percentage}
        onChange={(e) => onPercentage(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}
function OutPut({ bill, tip }) {
  const total = bill + tip;
  return (
    <h2>
      You pay ${total} ( ${bill} + ${tip} )
    </h2>
  );
}
function Reset({ onReset }) {
  return (
    <button className="button" onClick={onReset}>
      Reset
    </button>
  );
}
