import React from "react";
// import { FireFilled } from "@ant-design/icons";
// import styles from "./styles/Logo.module.css";
import styles from '../styles/Logo.module.css'
import logoProfe from '../../../assets/profeLogo.svg'


export const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logoProfe} alt="" />
    </div>
  );
};
