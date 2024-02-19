import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Input, Table, Button, Select, Modal  } from 'antd';
import { useEffect, useState } from "react";
import axios from "axios";
import { ConfigProvider, theme } from 'antd';
import reactImage from "../../assets/header.svg"
import { DatePicker } from 'antd';
import {EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';


// dayjs.extend(customParseFormat);
// const dateFormat = 'YYYY-MM-DD';


const { Search } = Input;

const StyleDatePicker = styled(DatePicker)`
  margin: 5px;
  height:50px !important;
  width: 100% !important;
  // border: solid red 3px !important;
`

const StyledSelect = styled(Select)`
margin: 5px;
height:50px !important;
border: solid grey 1px 
  .ant-select-selector {
    // background-color: #050E12 !important;
    // color: white !important;
    border: none !important;
    height:56px !important;
    width: 100% !important;
  }

  // .ant-select-selector:hover{
  //   background-color:#3A0F12 !important;
  // }


  // .ant-select-selector:hover,
  // .ant-select-selector:focus-within {
  //   //border: 1px solid red !important;
  //   color: white !important;
  // }

`;


export const Inputstyle = styled(Input)`
// border: solid blue 3px;
height: 48px !important;
margin: 5px  
`

export const ContainerSearch = styled(Search)`
// border: solid blue 3px;
width: 100%;
margin: 5px;
  .ant-input,
  .ant-btn {
    height: 35px !important;
    background-color: white !important; 
  }

  .ant-input-group {
    height: 35px !important;
  }

  .ant-input-search {
    height: 35px !important;
    // border: solid green 3px;
  }

  .ant-input-search-button {
    height: 51px !important;
  }

  .ant-input-affix-wrapper {
    background-color: white !important; // Agrega esta línea
  }

  .ant-btn {
    height: 51px !important;
    background-color: #0C9999 !important; // Agrega esta línea
  }
`;



export const ContainerPrincipal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;

  .imagen__banner{
    width: 100%;
    height: 20vh;
    background: url('../../assets/header.svg');
    background-repeat: no-repeat;
    background-size: cover; 
    background-position: center;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    margin: 20px;


    h1{
        margin-left: 20px;
    }
    
    h4{
        margin-left: 20px;

    }
}

  .cuerpo__container{
    // border: dotted blue 4px;
    width: 100%;
    height: 80vh;
  }

`

// const StyledTable = styled(Table)`
//   background-color: #ccc !important; // Cambia esto al color gris que desees
//   .ant-table-thead .ant-table-cell {
//     background-color: #555555 !important; // Cambia esto al color gris que desees
//   }
//   tbody {
//     background-color: #353535 !important; // Cambia esto al color gris que desees
//     tr:hover {
//       color: black !important;
//       background-color: #202020 !important; // Cambia esto al color que deseas en el hover
//       // Agrega otros estilos de hover según tus preferencias
//     }
//   }
// `;

export const  Salespage = () => {

  // Buscar

const [searchedText, setSearchedText] = useState("")

const onchangeTable=(pagination,filters,sorter,extra) =>{
  console.log('params', pagination,filters,sorter, extra);
}

// Editar

const [isEditing, setIsEditing] = useState(false)
const [ valueInputEditingVenta, setValueInputEditingVenta ] = useState();

const handleInputChangeEditingSale = (campo, valor) => {
  setValueInputEditingVenta((prevJardin) => ({
    ...prevJardin,
    [campo]: valor,
  }));
};

const onEditVenta= (record) => {
  setIsEditing(true)
  setValueInputEditingVenta({...record})
}

const resetEditing = () => {
  setIsEditing(false);
  setValueInputEditingVenta(null)
}

const actualizarVenta = async (formValues) => {
  debugger;
  try {
    const response = await fetch(`https://localhost:7211/api/Sale/EditarVenta/${valueInputEditingVenta.idVenta}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        IdCliente: formValues.idCliente,
        IdPaquete: formValues.idPaquete,
        FechaCompra: formValues.fechaCompra,
        Estado: formValues.estado,
      })
    });

    if (response.ok) {
      setIsEditing(false);
      alert("La venta se ha actualizado correctamente");
      // Puedes realizar acciones adicionales después de la actualización si es necesario
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("Error al actualizar la venta:", error);
  }
};

// data venta

  const [venta, setVenta] = useState([])

  const mostrarVentas = async () => {
    try {
      const response = await axios.get("https://localhost:7211/api/Sale/ObtenerVentas");
      // console.log(JSON.stringify(response.data, null, 2));
      setVenta(response.data);
      // console.log(usuario);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  useEffect(() => {

    mostrarVentas();

  }, [])

//Tablas
const colums = [
  {
    key:'1',
    title:'idVenta',
    dataIndex:'idVenta',
    filteredValue: [searchedText],
    onFilter: (value , record) => {
      return (
        
      String(record.idVenta)
        .toLowerCase()
        .includes(value.toLowerCase()) ||
      String(record.idCliente)
        .toLowerCase()
        .includes(value.toLowerCase()) || 
      String(record.idPaquete)
        .toLowerCase()
        .includes(value.toLowerCase()) || 
      String(record.fechaCompra)
          .toLowerCase()
          .includes(value.toLowerCase()) || 
      String(record.estado)
          .toLowerCase()
          .includes(value.toLowerCase()) 
      )
  }
  },
  {
    key:'2',
    title:'idCliente',
    dataIndex:'idCliente'
  },
  {
    key:'3',
    title:'idPaquete',
    dataIndex:'idPaquete'
  },
  {
    key:'4',
    title:'fechaCompra',
    dataIndex:'fechaCompra'
  },
  {
    key:'5',
    title:'estado',
    dataIndex:'estado'
  },
  {
    key:'6',
    title:'Actions',
    render:(record)=>{
      return <>
        <EditOutlined onClick={()=>{onEditVenta(record)}} />
      </>
    }
  }
  // {
  //   key:'6',
  //   title:'Acciones',
  //   render:(record)=>{
  //     return <>
  //       <EditOutlined onClick={()=>{onEditUsuario(record)}} />
  //       <DeleteOutlined onClick={()=> {onDeleteUsuario(record)}} style={{ color: "red", marginLeft: 12 }} />
  //     </>
  //   }
  // }
]

    let navigate = useNavigate();
    let {idPaquete} = useParams();

// SELECT

const provinceData = ['En Proceso','Cancelado', 'Completado'];

const handleProvinceChange = (value) => {
  setCities(cityData[value]);
  setSecondCity(cityData[value][0]);
};
// Integración Backend

const [idCliente, setIdCliente] = useState('');
const [idPaquetePrueba, setIdPaquete] = useState('');
const [fechaCompra, setFechaCompra] = useState(null); // Asegúrate de inicializarlo como null
const [estado, setEstado] = useState(''); 
const [isSaving, setIsSaving] = useState(false);



const handleIdClienteChange = (e) => {
  setIdCliente(e.target.value)
  alert("id cliente escogido es " + idCliente)
};
const handleIdPaqueteChange = (e) => {
  setIdPaquete(e.target.value)
  alert("id paquete escogido es " + idPaquetePrueba)
};
const handleFechaCompraChange = (date) => {
  setFechaCompra(date)
  alert(" fecha escogida es " + fechaCompra)
};
const handleEstadoChange = (value) => {
  setEstado(value)
  alert("estado escogido es " + estado)
};



const handleAgregarClick = async () => {
  const a = idCliente;
  
  const b = idPaquete;
  
  const c = fechaCompra;
  
  const d = estado;
  
  debugger;
  try {
    setIsSaving(true);

    const response = await axios.post('https://localhost:7211/api/Sale/GuardarVenta', {
      IdCliente: parseInt(idCliente),
      IdPaquete: parseInt(idPaquete),
      FechaCompra: fechaCompra.toISOString(), // Asegúrate de convertir la fecha a un formato adecuado
      Estado: estado,
    });

    console.log(response.data); // Puedes imprimir la respuesta del servidor si lo deseas
    mostrarVentas(); // Actualiza la lista de ventas después de agregar una nueva
    alert("Todo salio bien y se guardo con exito la venta")
    debugger;
  } catch (error) {
    console.error('Error al guardar la venta:', error);
  } finally {
    setIsSaving(false);
  }
};




  return (
     <>

  

            <ContainerPrincipal>
    
      
    
              <div className="imagen__banner" style={{
    
                background: `linear-gradient(to right, rgba(12, 153, 153, 0.6), rgba(12, 153, 153, 0)) 0%, url(${reactImage})`,
    
                backgroundRepeat: "no-repeat",
    
                backgroundSize: "cover",  // Ajusta esta propiedad para cubrir toda la imagen
    
                backgroundPosition: "center",
    
                height: "15vh"
    
                }}>
    
                  <h1>juan</h1>
    
                  <br />
    
                  <h4>Nos encanta verte nuevamente.</h4>
    
              </div>
    
      
      
    
              <ConfigProvider
    
                    theme={{
    
                    token:{
    
                        colorPrimary: "0C9999"
    
                      },
    
                    }}>
    
              <div
    
                    style={{
    
                      width:"100%",
    
                      // height:"15vh",
    
                      // margin:"20px",
    
                      // border: "solid red 3px",
    
                      display: "flex",
    
                      justifyContent: "space-around",
    
                      alignItems: "center",
    
                      margin:"20px"
    
                    }}
    
                  >
    
      
    
                  <div style={{
    
                    // border: "solid 3px red",
    
                    width:"30%"
    
      
    
                    }}>
    
      
    
                      <Inputstyle
    
                        onChange={handleIdClienteChange}
    
                        style={{
    
                          // height: "56px !important"
    
                        }}
    
                        placeholder='Id Cliente'
    
                          // value={valueInputEditingUsuario?.apellido}
    
                          // onChange={(e) => handleInputChange('apellido', e.target.value)}          
    
                      />
    
                      <Inputstyle
    
                        onChange={handleIdPaqueteChange}
    
                        placeholder='Id Paquete'
    
                        value={idPaquete}
    
                        // value={valueInputEditingUsuario?.apellido}
    
                        // onChange={(e) => handleInputChange('apellido', e.target.value)}          
    
                      />
    
                  </div>
    
      
    
                  <div style={{
    
                    // border: "solid 3px red"
    
                    width:"30%"
    
                    }}
    
                  >
    
      
      
    
                    <StyledSelect
    
                    placeholder='Estado'
    
                      // defaultValue={provinceData[0]}
    
                      style={{
    
                        width: '100%',
    
                      }}
    
                      onChange={handleEstadoChange}
    
                      options={[
    
                        {
    
                          label: 'Completado',
    
                          value: 'Completado',
    
                        },
    
                        {
    
                          label: 'En Proceso',
    
                          value: 'En Proceso',
    
                        },
    
                        {
    
                          label: 'Cancelado',
    
                          value: 'Cancelado',
    
                        },
    
                      ]}
    
                    />
    
      
    
                    <StyleDatePicker
    
                    placeholder='Fecha'
    
                    onChange={handleFechaCompraChange}
    
                    />
    
                  </div>
    
      
    
                  <div
    
                    style={{
    
                      // border: "solid 3px red",
    
                      display:"flex",
    
                      width:"30%",
    
                      flexDirection:"column",
    
                      justifyContent:"center",
    
                      alignItems: "center",
    
                    }}
    
                    >
    
                      <ConfigProvider
    
                        theme={{
    
                        token:{
    
                            colorPrimary: "0C9999"
    
                          },
    
                        }}>
    
                        <ContainerSearch
    
                          style={{
    
                          width:"100%",
    
                              }
    
                          }
    
                          placeholder="Buscar ..."
    
                          allowClear
    
                          enterButton="Buscar"
    
                          size="large"
    
                          onSearch = {(value)=> {
    
                            setSearchedText(value)
    
                            alert(value)
    
                          }}
    
                          onChange={(e)=>{
    
                            setSearchedText(e.target.value )
    
                          }}
    
                        />
    
                      </ConfigProvider>
    
      
    
                      <ConfigProvider
    
                      theme={{
    
                      token:{
    
                          colorPrimary: "0C9999"
    
                        },
    
                      }}>
    
      
    
                      <Button
    
                        style={{
    
                          width:"100%",
    
                          height:"56px",
    
                          margin:"5px !important"
    
                        }}
    
                        // onClick={ () => { setIsSaving (true)} }
    
                        onClick={handleAgregarClick}
    
                        type="primary"
    
                      >
    
                        Agregar
    
                      </Button>
    
      
    
                      </ConfigProvider>
    
                  </div>
    
              </div>
    
              </ConfigProvider>
    
      
    
              <div
    
                className="cuerpo__container"
    
                style={{width:"100%",
    
                display:"flex",
    
                margin: "20px 0px 20px 0px",
    
                flexDirection:"column"  }}
    
              >
    
      
      
    
                  <ConfigProvider
    
                      theme={{
    
                        algorithm: theme.lightAlgorithm,
    
                        token:{
    
                          colorPrimary: "0C9999"
    
                        },
    
                      }}
    
                    >
    
                      <Table
    
                        columns={colums}
    
                        dataSource={venta}
    
                        onchangeTable={onchangeTable}
    
                      ></Table>
    
      
    
                      <Modal
    
                          title="Editar Venta"
    
                          visible={isEditing}
    
                          onCancel={() => {
    
                            resetEditing()
    
                          }}
    
                          onOk={() => {
    
                            // Llama a la función actualizarVenta con los valores del formulario
    
                            actualizarVenta({
    
      
    
                              idCliente: valueInputEditingVenta?.idCliente,
    
                              idPaquete: valueInputEditingVenta?.idPaquete,
    
                              fechaCompra: valueInputEditingVenta?.fechaCompra,
    
                              estado: valueInputEditingVenta?.estado,
    
                            });
    
                            setVenta(pre => {
    
                              return pre.map(_jardin=>{
    
                                if (_jardin.idVenta === valueInputEditingVenta.idVenta){
    
                                  return valueInputEditingVenta
    
                                }
    
                                else{
    
                                  return _jardin
    
                                }
    
                              })
    
                            })
    
                            resetEditing()
    
                          }}
    
                          okText="Guardar"
    
                        >
    
    {/*
    
                            <ConfigProvider
    
                            theme={{
    
                            token:{
    
                                colorPrimary: "0C9999"
    
                              },
    
                            }}> */}
    
                            <Input
    
                              value={valueInputEditingVenta?.idCliente}
    
                              onChange={(e) => handleInputChangeEditingSale('idCliente', e.target.value)}
    
                            />
    
                            <Input
    
                              value={valueInputEditingVenta?.idPaquete}
    
                              onChange={(e) => handleInputChangeEditingSale('idPaquete', e.target.value)}
    
                            />
    
                            <Input
    
                              value={valueInputEditingVenta?.fechaCompra}
    
                              onChange={(e) => handleInputChangeEditingSale('fechaCompra', e.target.value)}          
    
                            />
    
                            <Input
    
                              value={valueInputEditingVenta?.estado}
    
                              onChange={(e) => handleInputChangeEditingSale('estado', e.target.value)}
    
                            />
    
                            {/* </ConfigProvider> */}
    
      
    
                      </Modal>
    
      
    
                  </ConfigProvider>
    
      
      
    
                {/* <div style={{color:'white'}}>{idPaquete}</div> */}
    
      
      
    
              </div>
    
      
    
            </ContainerPrincipal>
    
        </>
  )
}