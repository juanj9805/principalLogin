import React from 'react';
import { useState } from "react";
import styles from './styles/SideBarMenuPage.module.css'
// Nuevas importaciones
import { Button, Layout, theme } from "antd";
import { Logo } from './features/Logo'
import MenuList from './features/MenuList'
import ToggleThemeButton from './features/ToggleThemeButton'
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
//redux
/* import { counterSlice } from '../../store/slices/counter/counterSlice' */

const { Header, Sider } = Layout;

const SideBarMenuPage = () => {

  const darkThemeColors = {
    background: '#202020', // verde oscuro para dark
    text: '#ffffff', // blanco para el texto en dark
  };
  
  const lightThemeColors = {
    background: '#ffffff', // blanco para light
    text: '#333333', // color de texto para light
  };

  

    const [darkTheme, setDarkTheme] = useState(true);

    const [collapsed, setCollapsed] = useState(false);
  
    const toggleTheme = () => {
      setDarkTheme(!darkTheme);
    };
  
    const themeColors = darkTheme ? darkThemeColors : lightThemeColors;

    const {
      token: { colorBgContainer },
    } = theme.useToken();

    return (

    <div className={styles.container__app}>
        <Layout>
          <Sider
            collapsed={collapsed}
            collapsible
            trigger={null}
            className={styles.sidebar}
            theme={darkTheme ? "dark" : "light"}
            style={{
              background: themeColors.background,
              color: themeColors.text,
              
            }}
          >
            <Logo />
            <MenuList darkTheme={darkTheme} />
            <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
          </Sider>
  
          <Header 
          style={{ padding: 0, background: themeColors.background, color: themeColors.text , height: '100vh'}}>
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </Header>
  
        </Layout>
      </div>

    );
}

export default SideBarMenuPage;
