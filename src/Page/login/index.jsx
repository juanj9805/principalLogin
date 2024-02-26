import React, { createRef, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styles from './styles/Login.module.css'
import { Button, Checkbox, Col, Form, Input, Row ,ConfigProvider, Radio } from 'antd';
import { Modal } from 'antd';
// import { useNavigate } from 'react-router-dom';  
import Cookies from 'universal-cookie';
import axios from 'axios';
// REDUX
// import { useSelector, useDispatch } from "react-redux";
// import { increment } from        "../../storeRedux/slices/counter"
// import { changeAuthorized } from "../../storeRedux/slices/authorized"
import md5 from 'md5';
import { useSelector, useDispatch  } from "react-redux";
import {changeAuthorized} from "../../store/slices/authorized/authorizedSlice"
import { useNavigate } from 'react-router-dom';
import LogoProfe from '../../assets/profeLogo.svg'
import FooterProfe from '../../assets/footer.svg'
import { changeRoleAuthorized } from '../../store/slices/roleSlice/roleSlice';


const {Item} = Form;
const {Password} = Input;


export const Login = (  ) => {

    /********************************* */
    /***********     Patron Redux    ****** */
    /********************************* */
    // dispatch

    const {authorizedStateRedux} = useSelector  (state=>state.authorized)
    const { roleStateRedux } = useSelector ( state=>state.roles)
    // let stateReduxOut = false
    //Despachar la accion 
    const dispatch = useDispatch();

{/* <Button onClick={ () => dispatch( changeAuthorized() )} >Counter</Button> */}

    /********************************* */
    /***********     DarkMode    ****** */
    /********************************* */

    const [currentTheme, setCurrentTheme] = useState('light');

    const lightTheme = {
        colorPrimary: 'rgb(58,15,18)',//'#B339ED',//green
        colorTextBase: 'rgb(58,15,18)',//green
        colorTextLightSolid: 'white',
    }
    const darkTheme = {
        colorPrimary: '#353434',//black
        colorTextBase: '#353434',//blak
        colorTextLightSolid: 'white',
    }

    /********************************* */
    /***********     DarkMode    ****** */
    /********************************* */

    const formRef = createRef();

    const formSuccess = (datos) => {
        console.log("Formulario enviado exitosamente: ", datos);

    }

    const formItemLayout = {
        labelCol:{
            xs:{
                span: 12,
            },
            sm:{
                span:8,
            }
        },
        wrappercol:{
            xs:{
                span:4,
            },
            sm:{
                span:20,
            }
        }

        
     }


    /************************************* */
    /***********     Controlador    ****** */
    /************************************* */


    const baseUrl = "api/Usuarios/IniciarSesion";

    const cookies = new Cookies();

    const iniciarSesion = async () => {
        const credentials = {
            correo: form.correo,
            contrasena: md5(form.password)
        };
    
        try {
            const response = await fetch(`http://54.81.138.113:5000/api/Usuarios/IniciarSesion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
    
            if (response.ok) {
                const usuario = await response.json();
    
                const idTipoRole = usuario.idTipoRole;
    
                if (idTipoRole === 1) {
                    dispatch(changeRoleAuthorized());
                }
    
                navigate('/');
                dispatch(changeAuthorized());
    
                // Almacena los datos en cookies
                cookies.set('idUsuario', usuario.idUsuario, { path: '/' });
                cookies.set('idTipoDocumento', usuario.idTipoDocumento, { path: '/' });
                cookies.set('nombre', usuario.nombre, { path: '/' });
                cookies.set('apellido', usuario.apellido, { path: '/' });
                cookies.set('correo', usuario.correo, { path: '/' });
                // Puedes agregar más campos según sea necesario
                debugger;

                 
                const idUsuarioCookie = cookies.get('nombre');
                console.log('Id de Usuario:', idUsuarioCookie);
    
                console.log("Inicio de sesión exitoso");
    
            } else {
                alert('El usuario o la contraseña no son correctos');
            }
        } catch (error) {
            console.error("Error al iniciar sesión", error);
        }   
    };

    
    // const iniciarSesion = async () => {  
    //     const credentials = {
    //     correo: form.correo,
    //     contrasena: md5(form.password)
    //     };
     
    //     console.log(credentials)

    //     try {
    //     //   const response = await fetch(`https://localhost:5001/api/Usuarios/IniciarSesion`, {
    //       const response = await fetch(`https://localhost:7211/api/Usuarios/IniciarSesion`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(credentials),
    //       });
      
    //       if (response.ok) {
    //         const usuario = await response.json();

    //         const idTipoRole = usuario.idTipoRole;
 
    //         if(idTipoRole === 1){
                
                
    //             dispatch( changeRoleAuthorized() )
    //         }
    //         const aw = roleStateRedux;
    //         navigate('/');
    //         dispatch( changeAuthorized() )      
      
    //         console.log("Inicio de sesión exitoso");

    //       } else {
    //         alert('El usuario o la contraseña no son correctos');
    //       }
    //     } catch (error) {
    //       console.error("Error al iniciar sesión", error);
    //     }   
    //   };


        

// ...





    const [form, setForm]=useState({
        correo:'',
        password:''
    })
    const handleChange=e=>{
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(form);
    }

    //-------------------------modal
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);

    };
  
    const handleOk = () => {
      setIsModalOpen(false);
      navigate('/');
    //   dispatch( changeAuthorized() )
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

     //-------------------------modalregistro

     const [isModalOpenRegistro, setIsModalOpenRegistro] = useState(false);
 
     const showModalRegistro = () => {
        setIsModalOpenRegistro(true);
 
     };
   
     const handleOkRegistro = () => {
        // guardarUsuario()
    
       setIsModalOpenRegistro(false);
       navigate('/');
       alert("bien Jaime");
       console.log(` Jaime este es el registro: tipoDocumento: ${formDataRegistro.idTipoDocumento} 
       numeroDocumento: ${formDataRegistro.numeroDocumento} 
       Nombres: ${formDataRegistro.nombres} 
       Apellidos: ${formDataRegistro.apellidos} 
       Correo: ${formDataRegistro.correo} 
       Contrasena: ${formDataRegistro.contrasena} 
       `);

       console.log(` Jaime este es el tipo: tipo 
       Documento Tipo: ${ typeof idTipoDocumento3} 
       numeroDocumento Tipo: ${typeof numeroDocumento3} 
       Nombres Tipo: ${typeof nombres3} 
       Apellidos Tipo: ${typeof apellidos3} 
       Correo Tipo: ${typeof correo3} 
       Contrasena Tipo: ${typeof contrasena3} 
       `);

     };

     const guardarUsuario = async (formValues) => {

        var idTipoDocumento2 = formValues.idTipoDocumento;
        var numeroDocumento2 = formValues.numeroDocumento;
        var nombres2 = formValues.nombres;
        var apellidos2 = formValues.apellidos;
        var correo2 = formValues.correo;
        var contrasena2 = formValues.contrasena;


        var idTipoDocumento3 = parseInt(formValues.idTipoDocumento);
        var numeroDocumento3 = formValues.numeroDocumento.toString();
        var nombres3 = formValues.nombres.toString();
        var apellidos3 = formValues.apellidos.toString();
        var correo3 = formValues.correo.toString();
        var contrasena3 = md5(formValues.contrasena.toString());
        // console.log("Tipo de IdTipoDocumento:", typeof idTipoDocumento);
        // console.log("Tipo de NumeroDocumento:", typeof numeroDocumento);
        // console.log("Tipo de Nombres:", typeof nombres);
        // console.log("Tipo de Apellidos:", typeof apellidos);
        // console.log("Tipo de Correo:", typeof correo);
        // console.log("Tipo de Contrasena:", typeof contrasena);


        console.log(` Jaime este es el registro: tipoDocumento: ${formDataRegistro.idTipoDocumento} 
        numeroDocumento: ${formDataRegistro.numeroDocumento} 
        Nombres: ${formDataRegistro.nombres} 
        Apellidos: ${formDataRegistro.apellidos} 
        Correo: ${formDataRegistro.correo} 
        Contrasena: ${formDataRegistro.contrasena} 
        `);

        try {
            const response = await fetch("api/usuario/GuardarUsuario", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    
                    IdTipoDocumento: idTipoDocumento3,
                    NumeroDocumento: numeroDocumento3,
                    Nombres: nombres3,
                    Apellidos: apellidos3,
                    Correo: correo3,
                    Contrasena: contrasena3,
         
                })
            });
    
            if (response.ok) {
                formRef.current.resetFields(); // Reinicia los campos del formulario
                //alert("El usuario se ha guardado correctamente");
                   // ULTIMO MODAL
                    showModalRegistroSucces()
                    // ULTIMO MODAL
                // await mostrarTareas();
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.error("Error al guardar el usuaario:", error);
        }
    }
   
     const handleCancelRegistro = () => {
        setIsModalOpenRegistro(false);

     };


    
     const [formDataRegistro, setFormDataRegistro] = useState({
        idTipoDocumento: '',
        numeroDocumento: '',
        nombres: '',
        apellidos: '',
        correo:'',
        contrasena:'',

    });

    const handleChangeRegistro = (e) => {
        const { name, value } = e.target;
        setFormDataRegistro((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        };

    // const formSuccessRegistro = (datos) => {
    //     console.log("FormularioRegistro enviado exitosamente Jaime Modal registro: ", datos);
    // }

    const formRefRegistro = createRef();

    //-------------------------modalregistron succes

    const [isModalOpenRegistroSucces, setIsModalOpenRegistroSucces] = useState(false);
 
    const showModalRegistroSucces = () => {
       setIsModalOpenRegistroSucces(true);

    };
  
    const handleOkRegistroSucces = () => {
        setIsModalOpenRegistroSucces(false);
        setIsModalOpenRegistro(false);
        navigate('/');
    }

    const handleCancelRegistroSucces = () => {
        setIsModalOpenRegistroSucces(false);
        setIsModalOpenRegistro(false);
      };
  

 
    // ---------------------- Redux  ---------------------

    // REDUX
    // import { useSelector, useDispatch } from "react-redux";
    // import { increment } from        "../../storeRedux/slices/counter"
    // import { changeAuthorized } from "../../storeRedux/slices/authorized"

    // const { counterJaime } = useSelector( state => state.counter )
    // const { authorizedStateRedux } = useSelector( state => state.authorized )

    // const dispatch = useDispatch();

    // const [stateReduxAut2 , setStateReduxAut2] = useState(authorizedStateRedux)

    // useEffect(()=>{

    //     setStateReduxAut2(authorizedStateRedux)

    // } , [authorizedStateRedux])

    const estiloClipPath = {
        clipPath: 'ellipse(76% 40% at 73% 97%)'}

    return (


        <>  

  

                <div className={styles.container__padre} >                          
        
        {/*             <div className={styles.container} >
        
          
        
                        {
        
                            currentTheme === 'light'
        
                            ?  <p className={styles.iniciar__sesion} > Iniciar sesion  </p>
        
                            :   <p className={styles.iniciar__sesion__dark} > Iniciar sesion </p>
        
                        }
        
                    </div>  */}
        
          
        
                    <div className={styles.sub_container} >
        
          
        
                        <img src={LogoProfe}>
        
                        </img>
        
                        <ConfigProvider
        
                            className={styles.container}
        
                            theme={{
        
                            token: currentTheme==='light' ? lightTheme : darkTheme ,
        
                            }} >
        
          
          
        
          
        
                                            <Form
        
                                             style={{
        
                                                // border: "solid red 3px",  
        
                                                width: "66% "    
        
                                            }}
        
                                                {...formItemLayout}
        
                                                ref={formRef}
        
                                                name="Formulario"
        
                                                initialValues={{
        
                                                    recordar:true
        
                                                }}
        
                                                onFinish={formSuccess}
        
                                                // inFinishFailed={formFailed}
        
                                                // onFinish={}
        
                                            >
        
                                                <ConfigProvider
        
                                                theme={{
        
                                                token:{
        
                                                    colorPrimary: "0C9999"
        
                                                },
        
                                                }}>
        
                 <Item
        
                                                    // label="Correo"
        
                                                    // name='correo'
        
                                                    rules={[{
        
                                                        required:true,
        
                                                        message: "Por favor ingresa tu correo "
        
                                                    }]}
        
                                                    >
        
                                                        <Input
        
                                                        placeholder='Usuario'
        
                                                        name='correo'
        
                                                        onChange={handleChange}
        
                                                        />
        
          
        
                                                </Item>
        
          
        
                                                <Item
        
                                                    // label="Contraseña"
        
                                                    //name="password"
        
                                                    rules={[{
        
                                                        required: true,
        
                                                        message: "Por favor Ingresa tu Contraseña"
        
                                                    }]}
        
                                                    >
        
                                                        <Password
        
          
        
                                                        placeholder='Contraseña'
        
                                                        name='password'
        
                                                        onChange={handleChange}
        
                                                        />
        
          
        
                                                </Item>
        
                                                </ConfigProvider>
        
          
        
                                                <Item
        
                                                    style={{textAlign: 'center'}}
        
                                                >
        
                                                <ConfigProvider
        
                                                  theme={{
        
                                                    token:{
        
                                                      colorPrimary: "#0C9999",
        
                                                    //   background: linear-gradient(to right, #ff8a00, #e52e71);
        
                                                      padding: "200px"
        
                                                    },
        
                                                  }}
        
                                                >
        
          
        
                                                    <Button type='primary' htmlType='submit' onClick={()=>iniciarSesion()}
        
                                                    style={{
        
                                                        background: "linear-gradient(to right, #0C9999, #00CEE8)"
        
                                                    }}
        
                                                    >Iniciar Sesión</Button>
        
                                                </ConfigProvider>
        
                                                    {/* <h1> mira el counter:
        
                                                    {   counterJaime}
        
          
        
                                                    </h1>   */}
        
                                                    {/* <Button htmlType='button' onClick={borrarCampos}>Borrar Campos</Button> */}
        
                                                </Item>
        
          
          
          
        
                                            </Form>
        
                                                    {/* <Button onClick={ () => dispatch( increment() )} >Counter</Button>
        
          
        
                                                    <Button onClick={ () => dispatch( changeAuthorized() )} >Autorized</Button> */}
        
                                                    {/* <Button onClick={ () =>  showModal() } >Show Modal</Button> Este sii nooo! */}
        
          
          
        
          
        
                        </ConfigProvider>
        
                    </div>
        
                    <div style={{
        
                        width:"100%",
        
                        // border: "solid red 3px",
        
                        // marginTop:"100px"
        
                        position:"absolute",
        
                        bottom:"0px"
        
                    }}>
        
          
        
                    <img
        
                    style={{
        
                        width:"100%"
        
                    }}
        
                    src={FooterProfe} alt="" />      
        
                    </div>
        
                </div>
        
                <Modal title="Su registro ha sido exitoso!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        
          
          
        
                <a href="/">
        
          
          
        
                </a>
        
              </Modal>      
        
          
          
        
            {/*   <Modal title="Reistro!" open={isModalOpenRegistro} onOk={handleOkRegistro} onCancel={handleCancelRegistro}>
        
                    <Form
        
                        {...formItemLayout}
        
                        ref={formRefRegistro}
        
                        name="FormularioRegistro"
        
                        onFinish={guardarUsuario}
        
                    >
        
                        <Item
        
                            label="idTipoDocumento"
        
                            rules={[{
        
                                required:true,
        
                                message: "Por favor ingresa el idTipoDocumento "
        
                            },
        
                            {
        
                                pattern: /^[1-9]\d*$/,
        
                                message: "Ingresa solo números enteros positivos en el idTipoDocumento"
        
                            }
        
                            ]}
        
                            name="idTipoDocumento"
        
                            >
        
                            <Input placeholder="input idTipoDocumento" name="idTipoDocumento" value={formDataRegistro.idTipoDocumento} onChange={handleChangeRegistro}  />
        
                        </Item>
        
          
        
                        <Item
        
                            label="numeroDocumento"
        
                            rules={[{
        
                                required:true,
        
                                message: "Por favor ingresa la numeroDocumento "
        
                            },
        
                            {
        
                                pattern: /^[1-9]\d*$/,
        
                                message: "Ingresa solo números enteros positivos en el numeroDocumento"
        
                            }
        
                            ]}
        
                            name="numeroDocumento"
        
                            >
        
                            <Input placeholder="input numeroDocumento" name="numeroDocumento" value={formDataRegistro.numeroDocumento} onChange={handleChangeRegistro}  />
        
                        </Item>
        
          
        
                        <Item
        
                            label="nombres"
        
                            rules={[{
        
                                required:true,
        
                                message: "Por favor ingresa los nombres "
        
                            }]}
        
                            name = "nombres"
        
                            >
        
                            <Input placeholder="input nombres"  name="nombres" value={formDataRegistro.nombres} onChange={handleChangeRegistro}/>
        
                        </Item>
        
          
        
                        <Item
        
                            label="apellidos"
        
                            rules={[{
        
                                required:true,
        
                                message: "Por favor ingresa los apellidos "
        
                            }]}
        
                            name = "apellidos"
        
                            >
        
                            <Input placeholder="input apellidos"  name="apellidos" value={formDataRegistro.apellidos} onChange={handleChangeRegistro}/>
        
                        </Item>
        
          
        
                        <Item
        
                            label="correo"
        
                            rules={[{
        
                                required:true,
        
                                message: "Por favor ingresa los correo "
        
                            }]}
        
                            name = "correo"
        
                            >
        
                            <Input placeholder="input correo"  name="correo" value={formDataRegistro.correo} onChange={handleChangeRegistro}/>
        
                        </Item>
        
          
        
                        <Item
        
                            label="Contraseña"
        
          
        
                            rules={[{
        
                                required: true,
        
                                message: "Por favor Ingresa tu Contraseña"
        
                            }]}
        
                            name="contrasena"
        
                            >
        
                                <Password
        
          
        
                                name='contrasena'
        
                                onChange={handleChangeRegistro}
        
                                />
        
          
        
                        </Item>
        
          
        
                        <Item
        
                            style={{textAlign: 'center'}}
        
                        >
        
                            <Button  type="primary" htmlType='submit'   >Submit Registro</Button>
        
          
        
                        </Item>
        
          
        
          
        
                    </Form>
        
              </Modal> */}
        
          
        
              <Modal title="El usuario se ha agregado correctamente!" open={isModalOpenRegistroSucces} onOk={handleOkRegistroSucces} onCancel={handleCancelRegistroSucces}  >
        
              </Modal>  
        
            </>
    );
}

