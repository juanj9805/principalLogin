


// Nuevas importaciones
import { Layout } from 'antd';
import {Logo} from './features/Logo.jsx';
import MenuList from './features/MenuList.jsx';

const { Header, Sider }  = Layout;
/* const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world Home Page!</div>,
    },
    {
      path: "/pagina1",
      element: <div>Hello world Pagina 1!</div>,
    },
    {
      path: "/pagina2",
      element: <div>Hello world!  Pagina 2</div>,
    },
    {
      path: "/pagina3",
      element: <div>Hello world!  Pagina 3</div>,
    },
    
  ]); */
export const HomePage = () => {
  return (
    <>

      <Layout>
        <Sider className='sidebar' >
<h1>hi</h1>
          <Logo/>
          <MenuList/>

        </Sider>
      </Layout>

    </>
);
}


