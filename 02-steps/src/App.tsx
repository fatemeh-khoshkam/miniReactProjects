import React , {MouseEventHandler, ReactNode, useState } from "react";

const messages:string[] = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App():React.JSX.Element {
  const [step, setStep] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function previousHandler():void {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  }
  function nextHandler():void {
    if (step < 3) setStep((prevStep) => prevStep + 1);
  }
  function closeHandler():void {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <>
      <button className="close" onClick={closeHandler}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              bgColor="#7950f2"
              textColor="#fff"
              onClick={previousHandler}
            >
              👈 Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={nextHandler}>
              Next 👉
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

interface buttonProps {
  bgColor: string;
  textColor: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

function Button({ bgColor, textColor, onClick, children }: buttonProps):React.JSX.Element {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

interface stepProps {
  children: ReactNode;
  step: number;
}

function StepMessage({ children, step } : stepProps):React.JSX.Element {
  return (
    <div className="message">
      <p>Step {step} :</p>
      {children}
    </div>
  );
}
