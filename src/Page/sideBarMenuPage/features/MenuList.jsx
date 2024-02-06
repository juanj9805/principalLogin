import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { BarsOutlined, UserOutlined,LogoutOutlined, BarChartOutlined } from "@ant-design/icons";
import style from '../styles/MenuList.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//IMPORTAR LA ACCIÓN
import {changeAuthorized} from "../../../store/slices/authorized/authorizedSlice"


const MenuList = ({ darkTheme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOk = () => {
    // setIsModalOpen(false);
    navigate('/');
    dispatch( changeAuthorized() )
  };
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className={style.menu__bar}
      //   onClick={(item) => {
      //     navigate(item.key);
      //   }}
    >
      <Menu.Item key="/clientes" icon={<AppstoreOutlined />}>
        <Link  to={"/clientes"}>
          Clientes
        </Link>
      </Menu.Item>
      
      <Menu.Item key="/" icon={<UserOutlined />}>
         <Link  to={"/"}>
          Usuarios
        </Link> 
        {/* <a href="/">Home</a> */}
      </Menu.Item>

{/* 
      <Menu.Item key="/paquetes" icon={<CarOutlined />}>
        <Link  to={"/paquetes"}>
          Paquetes 
        </Link>
      </Menu.Item> */}

      <Menu.Item key="/reportes" 
      icon={<BarChartOutlined />}
      >
        <Link  to={"/reportes"}>
          Reportes
        </Link>
      </Menu.Item> 

      <Menu.Item key="/viajes" 
      icon={<BarChartOutlined />}
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
