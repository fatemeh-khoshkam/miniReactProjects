import { useState} from "react";

export default function App():React.JSX.Element {
  const [bill, setBill] = useState<number | null>(null);
  const [percentage1, setPercentage1] = useState<number>(0);
  const [percentage2, setPercentage2] = useState<number>(0);
  let tip:number = ((percentage1 + percentage2) / 2) * 0.01;
  let tipTotal:number = Number((tip * (bill ?? 0)).toFixed(0));

  function reset():void {
    setBill(null);
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div className="App">
      <Bill bill={bill} onPayBill={setBill}></Bill>
      <Select percentage={percentage1} onPercentage={setPercentage1}>
        How did you like the service ?
      </Select>
      <Select percentage={percentage2} onPercentage={setPercentage2}>
        How did your friend like the service ?
      </Select>
      {bill !== null && bill > 0 && (
        <>
          <OutPut bill={bill} tip={tipTotal}></OutPut>
          <Reset onReset={reset}></Reset>
        </>
      )}
    </div>
  );
}

interface billProps {
    bill: number | null;
    onPayBill: (value: number | null) => void;
}

function Bill({ bill, onPayBill } : billProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        const value:string = e.target.value;
        if (value === "") {
            onPayBill(null);
        } else if (isNaN(Number(value))) {
            throw new Error("Please enter a valid number");
        } else {
            onPayBill(Number(value));
        }
    };

  return (
    <div>
      <span>How much was the bill ?</span>
      <input
        type="text"
        placeholder="Bill value"
        value={bill !== null ? bill : ""}
        onChange={handleChange}
      />
    </div>
  );
}

interface selectProps{
    children:React.ReactNode;
    percentage: number,
    onPercentage:(value: number) => void;
}

function Select({ children, percentage, onPercentage } : selectProps) {
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
function OutPut({ bill, tip } : {bill: number ; tip: number}) {
  const total:number = Number(bill) + tip;
  return (
    <h2>
      You pay ${total} ( ${bill} + ${tip} )
    </h2>
  );
}
function Reset({ onReset }:{ onReset : () => void }) {
  return (
    <button className="button" onClick={onReset}>
      Reset
    </button>
  );
}
