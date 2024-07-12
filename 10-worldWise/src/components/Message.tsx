//import React from 'react';
import styles from "./Message.module.css";

type messageProps = {
  message: string;
};

function Message({ message }: messageProps) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
