import React from "react"

type buttonProps = {
  children: React.ReactNode | string;
  onClick?:() => void,
}

export function Button({ children, onClick } : buttonProps) : React.JSX.Element {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
