import styled from "styled-components";
import reactImage from "../../assets/header.svg"
import axios from "axios";
import { useEffect, useState } from "react";
import { Input, Modal, Table, theme, ConfigProvider } from "antd";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import Card from "./components/Card";
import { useDispatch, useSelector } from 'react-redux';
import { getViajesThunks } from "../../store/slices/viajes";

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
    // background: url('../../assets/header.svg');
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

export const TravelPage = () => {

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


  //REDUX
  const dispatch = useDispatch();
  
  const {  getViajes = [], isLoading } = useSelector( state => state.viajes );
  
  useEffect( ()=> {
    
    dispatch( getViajesThunks()  ); // Del archivo "Thunks"
    
  }, [] )

/*   console.log("viajes con redux")
  console.log(getViajes) */
  
  //REDUX


  const [viajes, setViajes] = useState([])

  const mostrarViajes = async () => {
    try {
      const response = await axios.get("https://localhost:7211/api/Paquete/ObtenerPaquetes");
      // console.log(JSON.stringify(response.data, null, 2));
      setViajes(response.data);
      // console.log(viajes);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {

    mostrarViajes();

}, [])

//Tabla

const colums = [
  {
    key:'1',
    title:'idPaquete',
    dataIndex:'idPaquete'
  },
  // {
  //   key:'2',
  //   title:'imagenPaquete',
  //   dataIndex:'imagenPaquete'
  // },
  {
    key:'3',
    title:'nombrePaquete',
    dataIndex:'nombrePaquete'
  },
  {
    key:'4',
    title:'descripcionPaquete',
    dataIndex:'descripcionPaquete'
  },
  {
    key:'5',
    title:'precioPaquete',
    dataIndex:'precioPaquete'
  },
  {
    key:'6',
    title:'destinoPaquete',
    dataIndex:'destinoPaquete'
  },
  {
    key:'7',
    title:'fechaSalida',
    dataIndex:'fechaSalida'
  },
  {
    key:'8',
    title:'fechaRegreso',
    dataIndex:'fechaRegreso'
  },
  {
    key:'9',
    title:'Acciones',
    render:(record)=>{
      return <>
        <EditOutlined onClick={()=>{onEditViaje(record)}}/>
        <DeleteOutlined onClick={()=> {onDeleteViaje(record)}}  style={{ color: "red", marginLeft: 12 }} />
      </>
    }
  }
]

//Delete

const onDeleteViaje = (record) => {
  // console.log("Record:", record);

  Modal.confirm({
    title: '¿Estás seguro de eliminar?',
    onOk: async () => {
      try {
        if (record.idPaquete) { // Asegúrate de usar el nombre correcto de la propiedad
          await eliminarViaje(record.idPaquete);
          // Actualiza el estado para reflejar la eliminación
          setViajes((pre) => pre.filter((_jardin) => _jardin.idPaquete !== record.idPaquete));
        } else {
          console.error("No se puede obtener el ID del viaje a eliminar");
        }
      } catch (error) {
        console.error("Error al eliminar el viaje:", error);
      }
    },
  });
};

const eliminarViaje = async (idPaquete) => {
  try {
    const response = await fetch(`https://localhost:7211/api/Paquete/EliminarPaquete/${idPaquete}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (response.ok) {
      alert("El viaje se ha eliminado correctamente");
      // Puedes realizar acciones adicionales después de la eliminación si es necesario
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("Error al eliminar el viaje:", error);
  }
};


//Editar
const [isEditing, setIsEditing] = useState(false)
const [ valueInputEditingViaje, setValueInputEditingViaje ]= useState();

const handleInputChange = (campo, valor) => {
  setValueInputEditingViaje((prevJardin) => ({
    ...prevJardin,
    [campo]: valor,
  }));
};

const onEditViaje= (record) => {
  setIsEditing(true)
  setValueInputEditingViaje({...record})
}

const resetEditing = () => {
  setIsEditing(false);
  setValueInputEditingViaje(null)
}

const actualizarViaje = async (formValues) => {
  try {
    const response = await fetch(`https://localhost:7211/api/Paquete/EditarPaquete/${valueInputEditingViaje.idPaquete}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        ImagenPaquete: formValues.imagenPaquete,
        NombrePaquete: formValues.nombrePaquete,
        DescripcionPaquete: formValues.descripcionPaquete,
        PrecioPaquete: formValues.precioPaquete,
        DestinoPaquete: formValues.destinoPaquete,
        FechaSalida: formValues.fechaSalida,
        FechaRegreso: formValues.fechaRegreso,
      })
    });

    if (response.ok) {
      setIsEditing(false);
      alert("El paquete se ha actualizado correctamente");
      // Puedes realizar acciones adicionales después de la actualización si es necesario
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("Error al actualizar el paquete:", error);
  }
};





  return (
    <>

      <ContainerPrincipal>

        <div className="imagen__banner" style={{ 
        background: `linear-gradient(to right, rgba(12, 153, 153, 0.6), rgba(12, 153, 153, 0)) 0%, url(${reactImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",  // Ajusta esta propiedad para cubrir toda la imagen
        backgroundPosition: "center",
        height: "15vh"
        
        }}>
            <h1>juan</h1>
            <br />
            <h4>Nos encanta verte nuevamente.</h4>
        </div>

        <div className="cuerpo__container">

                {
                  !stateReduxAut ?
                    <ConfigProvider
                      theme={{
                        // 1. Use dark algorithm
                        algorithm: theme.lightAlgorithm,

                        // 2. Combine dark algorithm and compact algorithm
                        // algorithm: [theme.lightAlgorithm, theme.compactAlgorithm],
                      }}
                    >

                      <Table
                        columns={colums}
                        dataSource={getViajes}
                      
                      ></Table>

                    </ConfigProvider> 
                  :
                  <div style={{
                    // border:"solid blue 3px",
                    width:"100%",
                    display:"flex ",
                    flexWrap:"wrap",
                    flexDirection:"row ",
                    justifyContent:"space-around",
                    alignItems:"center",
                    margin:"50px 10px 50px 10px"
                    }}>

                      <Card 
                        style={{
                          border:"solid blue 3px",
                          width:"100%"
                        }}
                        ejemplo={"ejemplo juan"} data={getViajes}
                      />

                  </div>
                }


                 

                    <Modal
                        title="Editar Paquete"
                        visible={isEditing}
                        onCancel={() => {
                          resetEditing()
                        }}
                        onOk={() => {
                          // Llama a la función actualizarJardin con los valores del formulario
                          actualizarViaje({
                            imagenPaquete: valueInputEditingViaje?.imagenPaquete,
                            nombrePaquete: valueInputEditingViaje?.nombrePaquete,
                            descripcionPaquete: valueInputEditingViaje?.descripcionPaquete,
                            precioPaquete: valueInputEditingViaje?.precioPaquete,
                            destinoPaquete: valueInputEditingViaje?.destinoPaquete,
                            fechaSalida: valueInputEditingViaje?.fechaSalida,
                            fechaRegreso: valueInputEditingViaje?.fechaRegreso
                          });
                          setViajes(pre => {
                            return pre.map(_jardin=>{
                              if (_jardin.idPaquete === valueInputEditingViaje.idPaquete){
                                return valueInputEditingViaje
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

                        <Input
                          value={valueInputEditingViaje?.imagenPaquete}
                          onChange={(e) => handleInputChange('imagenPaquete', e.target.value)}
                        />
                        <Input
                          value={valueInputEditingViaje?.nombrePaquete}
                          onChange={(e) => handleInputChange('nombrePaquete', e.target.value)}
                        />
                        <Input
                          value={valueInputEditingViaje?.descripcionPaquete}
                          onChange={(e) => handleInputChange('descripcionPaquete', e.target.value)}
                        />
                        <Input 
                          value={valueInputEditingViaje?.precioPaquete} 
                          onChange={(e) => handleInputChange('precioPaquete', e.target.value)}          
                        />
                        <Input 
                          value={valueInputEditingViaje?.destinoPaquete} 
                          onChange={(e) => handleInputChange('destinoPaquete', e.target.value)}          
                        />
                        <Input 
                          value={valueInputEditingViaje?.fechaSalida} 
                          onChange={(e) => handleInputChange('fechaSalida', e.target.value)}          
                        />
                        <Input 
                          value={valueInputEditingViaje?.fechaRegreso} 
                          onChange={(e) => handleInputChange('fechaRegreso', e.target.value)}          
                        />
                      
                    </Modal>

        </div>
        

      </ContainerPrincipal>



    </>
);
}


