import styled from "styled-components";
import reactImage from '../../assets/header.svg';
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Table } from "antd";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import { Modal } from 'antd';


export const ContainerPrincipal = styled.div`
  width: 100%;
  height: 100vh;
  border: dotted red 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .imagen__banner{
    width: 100%;
    height: 20vh;
    border: dotted yellow 4px;
    background: url('../../assets/header.svg');
    background-repeat: no-repeat;
    background-size: cover; 
    background-position: center;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    h1{
        margin-left: 20px;
    }
    
    h4{
        margin-left: 20px;

    }
}

  .cuerpo__container{
    border: dotted blue 4px;
    width: 100%;
    height: 80vh;
  }

`
export const ClientPage = () => {
  const [clientes, setclientes] = useState([])

  const mostrarclientes = async () => {
  try {
    const response = await axios.get("https://localhost:7211/api/Cliente/ObtenerClientes");
    console.log(JSON.stringify(response.data, null, 2));
    setclientes(response.data);
    console.log(clientes);
  } catch (error) {
    console.error('Error:', error);
  }
}

useEffect(() => {

  mostrarclientes();

}, [])

//Diseño de tabla 
const colums = [
  {
    key:'1',
    title:'idTipoDocumento',
    dataIndex:'idTipoDocumento'
  },
  {
    key:'2',
    title:'nombreCompleto',
    dataIndex:'nombreCompleto'
  },
  {
    key:'3',
    title:'direccionDomicilio',
    dataIndex:'direccionDomicilio'
  },
  {
    key:'4',
    title:'numeroTelefono',
    dataIndex:'numeroTelefono'
  },
  {
    key:'5',
    title:'correoElectronico',
    dataIndex:'correoElectronico'
  },
  {
    key:'6',
    title:'Actions',
    render:(record)=>{
      return <>
        <EditOutlined onClick={()=>{onEditCliente(record)}} />
        <DeleteOutlined onClick={()=> {onDeleteClientes(record)}} style={{ color: "red", marginLeft: 12 }} />
      </>
    }
  }
  
]

//Eliminar

const onDeleteClientes = (record) => {
  console.log("Record:", record);

  Modal.confirm({
    title: '¿Estás seguro de eliminar?',
    onOk: async () => {
      try {
        if (record.idCliente) { // Asegúrate de usar el nombre correcto de la propiedad
          await eliminarCliente(record.idCliente);
          // Actualiza el estado para reflejar la eliminación
          setclientes((pre) => pre.filter((_clientes) => _clientes.idCliente !== record.idCliente));
        } else {
          console.error("No se puede obtener el ID del cliente a eliminar");
        }
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    },
  });
};
 
const eliminarCliente = async (id) => {
  try {
    const response = await fetch(`https://localhost:7211/api/Cliente/EliminarCliente/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (response.ok) {
      alert("El cliente se ha eliminado correctamente");
      // Puedes realizar acciones adicionales después de la eliminación si es necesario
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
  }
};

//Editar

const [isEditing, setIsEditing] = useState(false)
const [ valueInputEditingCliente, setValueInputEditingCliente ]= useState();

//On change
const handleInputChange = (campo, valor) => {
  setValueInputEditingCliente((prevCliente) => ({
    ...prevCliente,
    [campo]: valor,
  }));
};

const onEditCliente= (record) => {
  setIsEditing(true)
  setValueInputEditingCliente({...record})
}

const resetEditing = () => {
  setIsEditing(false);
  setValueInputEditingCliente(null)
}

const actualizarCliente = async (formValues) => {
  try {
    const response = await fetch(`https://localhost:7211/api/Cliente/EditarCliente/${valueInputEditingCliente.idCliente}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        // Id: valueInputEditingCliente.idCliente,
        IdTipoDocumento: formValues.idTipoDocumento,
        NombreCompleto: formValues.nombreCompleto,
        DireccionDomicilio: formValues.direccionDomicilio,
        NumeroTelefono: formValues.numeroTelefono,
        CorreoElectronico: formValues.correoElectronico,
      })
    });

    if (response.ok) {
      setIsEditing(false);
      alert("El cliente se ha actualizado correctamente");
      // Puedes realizar acciones adicionales después de la actualización si es necesario
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
  }
};

    return (
      <>  
      <ContainerPrincipal>

      <div className="imagen__banner" style={{ 
        background: `url(${reactImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", 
        backgroundPosition: "center"
        
         }}>
            <h1>juan</h1>
            <br />
            <br />
            <br />
            <h4>Nos encanta verte nuevamente.</h4>
        </div>
        <div className="cuerpo__container">


          <Table
            columns={colums}
            dataSource={clientes}
          
          ></Table>


          <Modal
              title="Editar cliente"
              visible={isEditing}
              onCancel={() => {
                resetEditing()
              }}
              onOk={() => {
                // Llama a la función actualizarJardin con los valores del formulario
                actualizarCliente({
                  // idCliente: valueInputEditingCliente?.idCliente,
                  idTipoDocumento: valueInputEditingCliente?.idTipoDocumento,
                  nombreCompleto: valueInputEditingCliente?.nombreCompleto,
                  direccionDomicilio: valueInputEditingCliente?.direccionDomicilio,
                  numeroTelefono: valueInputEditingCliente?.numeroTelefono,
                  correoElectronico: valueInputEditingCliente?.correoElectronico
                });
                setclientes(pre => {
                  return pre.map(_jardin=>{
                    if (_jardin.idCliente === valueInputEditingCliente.idCliente){
                      return valueInputEditingCliente
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



Id: formValues.idCliente,
                  IdTipoDocumento: formValues.idTipoDocumento,
                  NombreCompleto: formValues.nombreCompleto,
                  DireccionDomicilio: formValues.direccionDomicilio,
                  NumeroTelefono: formValues.numeroTelefono,
                  CorreoElectronico: formValues.correoElectronico,
                  
              <Input
                value={valueInputEditingCliente?.idCliente}
                onChange={(e) => handleInputChange('idCliente', e.target.value)}
              />
              <Input
                value={valueInputEditingCliente?.idTipoDocumento}
                onChange={(e) => handleInputChange('idTipoDocumento', e.target.value)}
              />
              <Input 
                value={valueInputEditingCliente?.nombreCompleto} 
                onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}          
              />
              <Input 
                value={valueInputEditingCliente?.direccionDomicilio} 
                onChange={(e) => handleInputChange('direccionDomicilio', e.target.value)}          
              />
              <Input 
                value={valueInputEditingCliente?.numeroTelefono} 
                onChange={(e) => handleInputChange('numeroTelefono', e.target.value)}          
              />
              <Input
                value={valueInputEditingCliente?.correoElectronico} 
                onChange={(e) => handleInputChange('correoElectronico', e.target.value)}          
              />
            
          </Modal>

        </div>


      </ContainerPrincipal>
      </>
  );
  }

