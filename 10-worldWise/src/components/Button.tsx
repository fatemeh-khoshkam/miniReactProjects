import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  type: string;
  onClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
};

function Button({ children, type, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
