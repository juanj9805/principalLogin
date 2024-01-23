import styled from "styled-components";
import reactImage from "../../assets/header.svg"
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Modal, Table } from "antd";
import { EditOutlined, DeleteOutlined} from "@ant-design/icons";


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

export const UserPage = () => {
  const [usuario, setUsuario] = useState([])

  const mostrarUsuarios = async () => {
    try {
      const response = await axios.get("https://localhost:7211/api/Usuarios/VerUsuario");
      // console.log(JSON.stringify(response.data, null, 2));
      setUsuario(response.data);
      // console.log(usuario);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {

    mostrarUsuarios();

  }, [])

//Tablas
const colums = [
  {
    key:'1',
    title:'idTipoDocumento',
    dataIndex:'idTipoDocumento'
  },
  {
    key:'2',
    title:'numeroDocumento',
    dataIndex:'numeroDocumento'
  },
  {
    key:'3',
    title:'nombre',
    dataIndex:'nombre'
  },
  {
    key:'4',
    title:'apellido',
    dataIndex:'apellido'
  },
  {
    key:'5',
    title:'correo',
    dataIndex:'correo'
  },
  {
    key:'6',
    title:'Actions',
    render:(record)=>{
      return <>
        <EditOutlined onClick={()=>{onEditUsuario(record)}} />
        <DeleteOutlined onClick={()=> {onDeleteUsuario(record)}} style={{ color: "red", marginLeft: 12 }} />
      </>
    }
  }
]

//Eliminar 

const onDeleteUsuario = (record) => {
  console.log("Record:", record);

  Modal.confirm({
    title: '¿Estás seguro de eliminar?',
    onOk: async () => {
      try {
        if (record.idUsuario) { // Asegúrate de usar el nombre correcto de la propiedad
          await eliminarUsuario(record.idUsuario);
          // Actualiza el estado para reflejar la eliminación
          setUsuario((pre) => pre.filter((_jardin) => _jardin.idUsuario !== record.idUsuario));
        } else {
          console.error("No se puede obtener el ID del usuario a eliminar");
        }
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    },
  });
};

const eliminarUsuario = async (idUsuario) => {
  try {
    const response = await fetch(`https://localhost:7211/api/Usuarios/EliminarUsuario/${idUsuario}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    });

    if (response.ok) {
      alert("El usuario se ha eliminado correctamente");
      // Puedes realizar acciones adicionales después de la eliminación si es necesario
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
};

//Editar 
const [isEditing, setIsEditing] = useState(false)
const [ valueInputEditingUsuario, setValueInputEditingUsuario ]= useState();

const handleInputChange = (campo, valor) => {
  setValueInputEditingUsuario((prevUsuario) => ({
    ...prevUsuario,
    [campo]: valor,
  }));
};

const onEditUsuario= (record) => {
  setIsEditing(true)
  setValueInputEditingUsuario({...record})
}

const resetEditing = () => {
  setIsEditing(false);
  setValueInputEditingUsuario(null)
}

const actualizarUsuario = async (formValues) => {
  try {
    const response = await fetch(`https://localhost:7211/api/Usuarios/EditarUsuario/${valueInputEditingUsuario.idUsuario}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        IdTipoDocumento: formValues.idTipoDocumento,
        NumeroDocumento: formValues.numeroDocumento,
        Nombre: formValues.nombre,
        Apellido: formValues.apellido,
        Correo: formValues.correo,
      })
    });

    if (response.ok) {
      setIsEditing(false);
      alert("El usuario se ha actualizado correctamente");
      // Puedes realizar acciones adicionales después de la actualización si es necesario
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
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
    dataSource={usuario}
  
  ></Table>

<Modal
    title="Editar Usuario"
    visible={isEditing}
    onCancel={() => {
      resetEditing()
    }}
    onOk={() => {
      // Llama a la función actualizarJardin con los valores del formulario
      actualizarUsuario({
        idTipoDocumento: valueInputEditingUsuario?.idTipoDocumento,
        numeroDocumento: valueInputEditingUsuario?.numeroDocumento,
        nombre: valueInputEditingUsuario?.nombre,
        apellido: valueInputEditingUsuario?.apellido,
        correo: valueInputEditingUsuario?.correo,
      });

      setUsuario(pre => {
        return pre.map(_jardin=>{
          if (_jardin.idJardin === valueInputEditingUsuario.idJardin){
            return valueInputEditingUsuario
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
      value={valueInputEditingUsuario?.idTipoDocumento}
      onChange={(e) => handleInputChange('idTipoDocumento', e.target.value)}
    />
    <Input
      value={valueInputEditingUsuario?.numeroDocumento}
      onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
    />
    <Input 
      value={valueInputEditingUsuario?.nombre} 
      onChange={(e) => handleInputChange('nombre', e.target.value)}          
    />
    <Input 
      value={valueInputEditingUsuario?.apellido} 
      onChange={(e) => handleInputChange('apellido', e.target.value)}          
    />
    <Input 
      value={valueInputEditingUsuario?.correo} 
      onChange={(e) => handleInputChange('correo', e.target.value)}          
    />
  
</Modal>

  </div>



</ContainerPrincipal>
    </>
);
}


/*  */