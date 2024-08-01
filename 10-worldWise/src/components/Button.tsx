import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  type: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonType?: "button" | "submit" | "reset";
};

function Button({
  children,
  type,
  onClick,
  buttonType = "button",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={buttonType}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
