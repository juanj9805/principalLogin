import { Menu } from 'antd';
import  { HomeOutlined, UserOutlined, PieChartOutlined, GlobalOutlined } from '@ant-design/icons';



const MenuList = () => {
    return (
<Menu theme='dark'mode="inline" className='menu-bar' >

    <Menu.Item
        key= "home" 
        icon={<HomeOutlined/>}
    >
        Inicio
    </Menu.Item>

    <Menu.Item
        key= "pagina1" 
        icon={<UserOutlined />}
    >
        Usuarios
    </Menu.Item>

    <Menu.Item
        key= "pagina2" 
        icon={<GlobalOutlined />}
    >
        Paquetes Turisticos
    </Menu.Item>


{/*     <Menu.SubMenu
            key="task"
            icon={<BarsOutlined/>}
            title="Task"
        >
            <Menu.Item
                key="task-1"
            >
                Task-1
            </Menu.Item>
            <Menu.Item
                key="task-2"
            >
                Task-2
            </Menu.Item>

    </Menu.SubMenu>
 */}



    <Menu.Item
        key= "pagina2" 
        icon={<PieChartOutlined />}
    >
        Reportes
    </Menu.Item>

</Menu>
    );
}

export default MenuList;
