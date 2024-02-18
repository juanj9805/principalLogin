import { useState } from "react";
import reactImage from "../../assets/header.svg"
import { Segmented, Progress, Button } from 'antd';
import { Column } from '@ant-design/charts';
import styled from 'styled-components';
import { Line, Pie } from '@ant-design/charts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getViajesThunks } from "../../store/slices/viajes";


const StyledColumn = styled(Column)`
  canvas {
    margin: auto !important;
    height: 100% !important ;
    width: 100% !important ;
    display: flex;

    // background-color: white;
    // border: solid green 4px;
  }
`
; 

const StyledLine = styled(Line)`
  canvas {
    margin: auto !important;
    display: flex;

    height: 100% !important ;
    width: 100% !important ;
    // background-color: white;
    // border: solid green 4px;
  }
`
;

const StyledPie = styled(Pie)`
  canvas {
    height: 200px ;
    width: 100% ;
    // background-color: #fff;
    // border: solid green 4px;
    flex-direction: row;
  }
`
;

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

//CHARTS  

export const ReportPage = () => {
      const dispatch = useDispatch();
      const {  getViajes = [], isLoading } = useSelector( state => state.viajes );
      useEffect( ()=> {

        dispatch( getViajesThunks()  ); // Del archivo "Thunks"
  
  }, [] )
      //GRAFICA CHART 
      const config2 = {

        data: getViajes,
        title: {
          visible: true,
          text: "grafica 1",
          size: 0,
          color: 'white',
        },
        xField: 'idPaquete',
        yField: 'precioPaquete',
        color: '#0C9999',
        point: {
          visible: true,
          size: 5,
          shape: 'diamond',
          style: {
            fill: '#0C9999',
            stroke: '#0C9999',
            lineWidth: 3,
          },
        },
      };

      // const config = {
      //   data: getViajes,
      //   xField: 'nombrePaquete',
      //   yField: 'precioPaquete',
      //   label: {
      //     position: 'top', // Cambiado de 'middle' a 'top'
      //     style: {
      //       fill: '#0C9999',
      //       opacity: 0.6,
      //       color:"white",
      //     },
      //   },
      //   meta: {
      //     type: { alias: 'Paquete' },
      //     sales: { alias: 'Precio' },
      //   },
      // };

      const config = {
        data: getViajes,
        xField: 'fechaSalida',
        yField: 'fechaRegreso',
        color: 'white', // Cambia este color según tus necesidades
        label: {
          position: 'top',
          style: {
            fill: 'white',

            opacity: 0.6,
            color: 'white',
          },
        },
        meta: {
          type: { alias: 'Paquete' },
          sales: { alias: 'Precio' },
        },
      };

      const configPie = {
        appendPadding: 10,
        data: getViajes,
        angleField: 'precioPaquete',
        colorField: 'nombrePaquete',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-30%',
          content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
          style: {
            fontSize: 14,
            textAlign: 'center',
          },
        },
        interAcciones: [
          { type: 'element-selected' },
          { type: 'element-active' },
        ],
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

          <div className="cuerpo__container"
               style={{
                display:"flex",
                flexDirection:"row",
                width:"100%",
                // justifyContent:"center",
                backgroundColor:"#fff"
              }}
          >
          <div style={{
            display:"flex", 
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            // border: "solid red 3px",
            width:"50%",
            }} >
            
                  <div
                  style={{
                    display:"flex",
                    justifyContent:"center !important",
                    alignItems:"center",
                    // width:"50%",
                    // border: "solid blue 3px",
                  }}
                  >
                      <StyledColumn {...config}/>
              
                    </div>
                  <div
                  style={{
                    display:"flex",
                    justifyContent:"center !important",
                    alignItems:"center",
                    // width:"50%",
                    // border: "solid blue 3px",
                  }}
                  >
                    
                      <StyledLine {...config2} />
                    </div>
          </div>


            <div
             style={{
              display:"flex",
              alignItems:"center",
              // flexDirection:"column",
              width:"50%",
              height:"100%",
              margin:"40px 20px 0px 30px",
              justifyContent:"center",
              // border:"solid 1px grey",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)"
              // border:"solid 3px red"
              // justifyContent:"center",
              // backgroundColor:"#fff"
            }}
            > 
              <StyledPie {...configPie} />
            </div>

          </div>
       


        </ContainerPrincipal>
      </>
  );
}
  
  
  