import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function previousHandler() {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  }
  function nextHandler() {
    if (step < 3) setStep((prevStep) => prevStep + 1);
  }
  function closeHandler() {
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

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function StepMessage({ children, step }) {
  return (
    <div className="message">
      <p>Step {step} :</p>
      {children}
    </div>
  );
}
