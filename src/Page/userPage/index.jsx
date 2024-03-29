import styled from "styled-components";
import reactImage from "../../assets/header.svg"
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Modal, Table, Button, Form,  } from "antd";
import { EditOutlined, DeleteOutlined} from "@ant-design/icons";
import { ConfigProvider, theme } from 'antd';
import Cookies from 'universal-cookie';
import React, { createRef} from 'react';


/* export const ContainerPrincipal = styled.div`
  width: 100%;
  height: 100%;
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

` */

const StyledTable = styled(Table)`
  background-color: #ccc !important; // Cambia esto al color gris que desees
  .ant-table-thead .ant-table-cell {
    background-color: #555555 !important; // Cambia esto al color gris que desees
  }
  tbody {
    background-color: #353535 !important; // Cambia esto al color gris que desees
    tr:hover {
      color: black !important;
      background-color: #202020 !important; // Cambia esto al color que deseas en el hover
      // Agrega otros estilos de hover según tus preferencias
    }
  }
`;

/* export const ContainerSearch = styled(Search)`
  .ant-input,
  .ant-btn {
    height: 48px !important;
    background-color: gray !important; 
  }

  .ant-input-group {
    height: 48px !important;
  }

  .ant-input-search {
    height: 48px !important;
    border: solid green 3px;
  }

  .ant-input-search-button {
    height: 63px !important;
  }

  .ant-input-affix-wrapper {
    background-color: gray !important; // Agrega esta línea
  }

  .ant-btn {
    height: 63px !important;
    background-color: #0C9999 !important; // Agrega esta línea
  }
`; */

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
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url('../../assets/header.svg');
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

export const UserPage = () => {
  const [usuario, setUsuario] = useState([])
  const cookies = new Cookies();

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
    title:'Acciones',
    render:(record)=>{
      return <>
        <EditOutlined onClick={()=>{onEditUsuario(record)}} />
        <DeleteOutlined onClick={()=> {onDeleteUsuario(record)}} style={{marginLeft: 12 }} />
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


const idUsuarioCookie = cookies.get('nombre');

//**** agregar Usuario */

const formRef = createRef();

const {Item} = Form;

const [isSaving, setIsSaving] = useState(false)

const [formData, setFormData] = useState({
  // createdAt: '',
  // valorSensor: '',
  // sensorId: '',
  numeroDocumento:'',
  nombres:'',
  apellido:'',
  correo:'',
  contrasena:'',
  idTipoRole:'',
  idTipoDocumento:'',
});

const resetSaving = () => {
  setIsSaving(false);
  setFormData({
    // createdAt: '',
    // valorSensor: '',
    // sensorId: '',
    numeroDocumento:'',
    nombres:'',
    apellido:'',
    correo:'',
    contrasena:'',
    idTipoRole:'',
    idTipoDocumento:'',
  });
}

const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData((prevData) => ({
      ...prevData,
      [name]: value,
  }));

};

const guardarUsuario = async (formValues = formData) => {
  try {
      const response = await fetch("https://localhost:7211/api/Usuarios/GuardarUsuario", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({

            // CreatedAt: formValues.createdAt,
            // ValorSensor: formValues.valorSensor,
            // SensorId: formValues.sensorId,

            numeroDocumento: formValues.numeroDocumento,
            nombres: formValues.nombres,
            apellido: formValues.apellido,
            correo: formValues.correo,
            contrasena: formValues.contrasena,
            idTipoRole: formValues.idTipoRole,
            idTipoDocumento: formValues.idTipoDocumento,

          })
      });

      if (response.ok) {

          formRef.current.resetFields(); // Reinicia los campos del formulario
          alert("el usuario se ha guardado correctamente");
          setUsuario((pre)=>{
            return [ ...pre, formData  ]
          })

          setIsSaving(false)

      } else {
          alert(response.statusText);
      }
  } catch (error) {
      console.error("Error al guardar el usuario:", error);
  }
}

  return (
     <>

      <ContainerPrincipal>

    <Button onClick={ () => { setIsSaving (true)} } > Agregar nuevo Usuario </Button>
    
      
    
    <div className="imagen__banner" style={{
    
            background: `linear-gradient(to right, rgba(12, 153, 153, 0.6), rgba(12, 153, 153, 0)) 0%, url(${reactImage})`,
    
            backgroundRepeat: "no-repeat",
    
            backgroundSize: "cover",  // Ajusta esta propiedad para cubrir toda la imagen
    
            backgroundPosition: "center",
    
            height: "15vh"
    
       }}>
     <h1>
      {idUsuarioCookie} 
      </h1>
          <h4>Nos encanta verte nuevamente.</h4>
    
      </div>
    
      <div className="cuerpo__container"
    
      style={{width:"100%",
    
      display:"flex",
    
      margin: "20px 0px 20px 0px",
    
      flexDirection:"column"  }} >
    
      
    
    <ConfigProvider
    
        theme={{
    
          token:{
    
            colorPrimary: "0C9999"
    
          },
    
          // 1. Use dark algorithm
    
          algorithm: theme.lightAlgorithm,
    
      
    
          // 2. Combine dark algorithm and compact algorithm
    
          // algorithm: [theme.lightAlgorithm, theme.compactAlgorithm],
    
        }}
    
      >
    
        <Table
    
          columns={colums}
    
          dataSource={usuario}
    
        ></Table>
    
    </ConfigProvider>
    
      
    
    <ConfigProvider
    
                    theme={{
    
                    token:{
    
                        colorPrimary: "0C9999"
    
                      },
    
                    }}>
    
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
    
    </ConfigProvider>
    
      
    
      </div>
    
      
      
      
    
    </ContainerPrincipal>

    <Modal
          title="Guardar Usuario"
          visible={isSaving}
          onCancel={() => {
            resetSaving()
          }}
          onOk={() => {
            guardarUsuario(formData)
          }}


          okText="Guardar"
        >
            <Form
                  ref={formRef}
                  name="Formulario"
              >

                  <Item 
                      label="numeroDocumento" 
                      rules={[{
                          required:true,
                          message: "Por favor ingresa el numeroDocumento "
                      },
                      {
                          pattern: /^[1-9]\d*$/, 
                          message: "Ingresa solo números enteros positivos en el numero documento"
                      }
                    ]}
                      name = "numeroDocumento"
                      >
                      <Input placeholder="input numeroDocumento"  name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange}/>
                  </Item>

                  <Item 
                      label="nombres"
                      rules={[
                        {
                          required:true,
                          message: "Por favor ingresa la nombres "
                      }
                  ]}
                      name="nombres"
                      >
                      <Input placeholder="input nombres" name="nombres" value={formData.nombres} onChange={handleChange}  />
                  </Item>

                  <Item 
                      label="apellido"
                      rules={[{
                          required:true,
                          message: "Por favor ingresa el apellido "
                      }
                  ]}
                      name="apellido"
                      >
                      <Input placeholder="input apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
                  </Item>


                  <Item 
                      label="correo"
                      rules={[{
                          required:true,
                          message: "Por favor ingresa el correo "
                      }
                  ]}
                      name="correo"
                      >
                      <Input placeholder="input correo" name="correo" value={formData.correo} onChange={handleChange} />
                  </Item>

                  <Item 
                      label="contrasena"
                      rules={[{
                          required:true,
                          message: "Por favor ingresa el contrasena "
                      }
                  ]}
                      name="contrasena"
                      >
                      <Input placeholder="input contrasena" name="contrasena" value={formData.contrasena} onChange={handleChange} />
                  </Item>



                  <Item 
                      label="idTipoRole"
                      rules={[{
                          required:true,
                          message: "Por favor ingresa el idTipoRole "
                      }
                  ]}
                      name="idTipoRole"
                      >
                      <Input placeholder="input idTipoRole" name="idTipoRole" value={formData.idTipoRole} onChange={handleChange} />
                  </Item>


                  
                  <Item 
                      label="idTipoDocumento"
                      rules={[{
                          required:true,
                          message: "Por favor ingresa el idTipoDocumento "
                      }
                  ]}
                      name="idTipoDocumento"
                      >
                      <Input placeholder="input idTipoDocumento" name="idTipoDocumento" value={formData.idTipoDocumento} onChange={handleChange} />
                  </Item>

              </Form>

    </Modal>
    
        </>
);
}


/*  */