import React from "react";
import { FireFilled } from "@ant-design/icons";
// import styles from "./styles/Logo.module.css";
import styles from '../styles/Logo.module.css'


export const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.logo__icon}>
        <FireFilled />
      </div>
    </div>
  );
};
