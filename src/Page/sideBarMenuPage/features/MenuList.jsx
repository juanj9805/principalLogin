import { Menu } from "antd";
import { UserOutlined, LogoutOutlined, PieChartOutlined, TeamOutlined, DollarOutlined, CompassOutlined, } from "@ant-design/icons";
import style from '../styles/MenuList.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//IMPORTAR LA ACCIÓN
import {changeAuthorized} from "../../../store/slices/authorized/authorizedSlice"
import { useEffect, useState } from "react";
// import { ConfigProvider, theme } from 'antd';

// export const MenuStyle = styled(Menu)`
// // border: solid blue 3px;
// height: 48px !important;
// margin: 5px  
// background-color: #ccc !important; // Cambia esto al color gris que desees 
// `



const MenuList = ({ darkTheme }) => {
  /* redux */
  const {roleStateRedux} = useSelector  (state=>state.roles)
  // let stateReduxOut = false
  //Despachar la accion 


  // const { roleStateRedux } = useSelector( state => state.authorized )
  const [stateReduxAut , setStateReduxAut] = useState(roleStateRedux)
  useEffect(()=>{

    setStateReduxAut(roleStateRedux)

} , [roleStateRedux])

// debugger;
console.log(stateReduxAut);

/*redux*/

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOk = () => {
    // setIsModalOpen(false);
    navigate('/');
    dispatch( changeAuthorized() )
  };
  const themeColors = {
    background: darkTheme ? '#202020' : '#ffffff', // Fondo verde oscuro para dark, blanco para light
    text: darkTheme ? '#ffffff' : '#333333', // Texto blanco para dark, oscuro para light
    // background: darkTheme ? '#008000' : '#ffffff', // Fondo verde oscuro para dark, blanco para light
    // text: darkTheme ? '#ffffff' : '#333333', // Texto blanco para dark, oscuro para light

  };

  return (
    
    <Menu
    style={{
      background: themeColors.background,
      color: themeColors.text,
    }}
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className={style.menu__bar}
      //   onClick={(item) => {
      //     navigate(item.key);
      //   }}
    >
      {/* <ConfigProvider> */}


      {/* </ConfigProvider> */}
      <Menu.Item key="/clientes" icon={<TeamOutlined  />}>
        <Link  to={"/clientes"}>
          Clientes
        </Link>
      </Menu.Item>


      <Menu.Item key="/sales" icon={<DollarOutlined />}>
        <Link  to={"/sales"}>
          Ventas
        </Link>
      </Menu.Item>

      {
        stateReduxAut ? 
        // true ? 
        <Menu.Item key="/" 
        icon={<UserOutlined />}
        >
          <Link  to={"/"}>
          Usuarios
          </Link> 
          {/* <a href="/">Home</a> */}
        </Menu.Item>
        :
        null
      }
      


{/* 
      <Menu.Item key="/paquetes" icon={<CarOutlined />}>
        <Link  to={"/paquetes"}>
          Paquetes 
        </Link>
      </Menu.Item> */}

      <Menu.Item key="/reportes" 
      icon={<PieChartOutlined />}
      >
        <Link  to={"/reportes"}>
          Reportes
        </Link>
      </Menu.Item> 

      <Menu.Item key="/viajes" 
      icon={<CompassOutlined />}
      >
        <Link  to={"/viajes"}>
          Viajes
        </Link>
      </Menu.Item> 

      <Menu.Item key="/logOut" 
      icon={<LogoutOutlined />}
      >
        <Link onClick={handleOk} to={"/"} >
          Cerrar sesion
        </Link>
      </Menu.Item> 

{/*       <Menu.Item key="/temperatura" icon={<AreaChartOutlined />}> */}
       {/*  <Link  to={"/temperatura"}>
        Temperatura
        </Link> */}
{/*        <a href="/temperatura">Temperatura</a> 
      </Menu.Item> */}

 {/*      <Menu.SubMenu key="task" icon={<BarsOutlined />} title="Task">
        <Menu.Item key="task-1">Task-1</Menu.Item>
        <Menu.Item key="task-2">Task-2</Menu.Item>
      </Menu.SubMenu>
 */}
      {/* <Menu.Item key="/pagina3" icon={<AreaChartOutlined />}></Menu.Item> */}
    </Menu>
  );
};

export default MenuList;
