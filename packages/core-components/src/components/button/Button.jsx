import React from "react";
import styles from "./Button.module.css";

function Button({ title }) {
  return <button className={styles.color}>Button: {title}</button>;
}

export default Button;
