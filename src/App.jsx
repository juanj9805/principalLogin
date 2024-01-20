import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import SideBarMenuPage from './Page/sideBarMenuPage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { Login } from './Page/login';
import { useSelector, useDispatch  } from "react-redux";
import {changeAuthorized} from "./store/slices/authorized/authorizedSlice"
// const { authorizedStateRedux } = useSelector( state => state.authorized )
import { Button, Layout } from 'antd';
import Clientes from './Page/clientes';
import { UserPage } from './Page/userPage';
import { ClientPage } from './Page/clientPage';
import { TravelPage } from './Page/travelPage';
import { ReportPage } from './Page/reportPage';

function App() {
      const {authorizedStateRedux} = useSelector  (state=>state.authorized)
      // let stateReduxOut = false
      //Despachar la accion 
      const dispatch = useDispatch();

      // const { authorizedStateRedux } = useSelector( state => state.authorized )
      const [stateReduxAut , setStateReduxAut] = useState(authorizedStateRedux)
      useEffect(()=>{

        setStateReduxAut(authorizedStateRedux)

    } , [authorizedStateRedux])

  return (
    <>
    <h1>
  {/* {authorizedStateRedux} */}
  {/* {authorizedStateRedux ? <h1>true</h1> : <h1>false</h1>  } */}
</h1>
{/* <Button onClick={ () => dispatch( changeAuthorized() )} >Counter</Button> */}
     <BrowserRouter>
     <div style={{display: 'flex', flexDirection: 'row'}}>
      {stateReduxAut && <Layout />}
        {stateReduxAut && <SideBarMenuPage />}
        {/* {!stateReduxAut ? <Login  /> : null} */}
          <Routes >        
          {!stateReduxAut && <Route exact path="/" element={<Login />} />}
            <Route element={<ProtectedRoute canActivate={stateReduxAut} />}>
              {/* <Route path="/" element={<SideBarMenuPage  />} /> */}           
              <Route path="/" element={<UserPage/>  }/>                
              <Route path="/clientes" element={<ClientPage/>  }/>                
              <Route path="/viajes" element={<TravelPage/>  } />
              <Route path="/reportes" element={<ReportPage/>  } />
            </Route>
          </Routes>
        {stateReduxAut && <Layout />}
      </div>
     </BrowserRouter>

    </>

  )
}

export default App
