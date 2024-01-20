import React from "react";
// import styles from "./styles/ToggleThemeButton.module.css";
import styles from '../styles/ToggleThemeButton.module.css'
//import { HiOutlineSun, HiOutlineMoon } from "@ant-design/icons";
import sun from "../../../assets/sun.svg";
import moon from "../../../assets/moon.svg";
import { Button } from "antd";

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className={styles.toogle__theme__btn}>
      <Button onClick={toggleTheme}>
        {darkTheme ? (
          <img className={styles.toogle__theme__btn__img} src={sun} alt="" />
        ) : (
          <img className={styles.toogle__theme__btn__img} src={moon} alt="" />
        )}
      </Button>
    </div>
  );
};

export default ToggleThemeButton;
