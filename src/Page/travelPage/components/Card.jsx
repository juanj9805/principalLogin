import { Button } from 'antd'
import React, { useEffect } from 'react'
// import exampleImage from '../../../assets/cartagena.svg';

export default function Card({ejemplo, data}) {
    const handleButtonClick = () => {
        // alert(data.descripcionPaquete);
    }

        useEffect(() => {
            console.log(data);
            // console.log(data[0].descripcionPaquete                );
            console.log("mira la data  ");
          }, [data]);
        
  return (
    <>
    {data.map((item, index) => (
        <div
        style={{
            width:"400px",
            height:"500px",
            border:"solid green 13px",
            borderRadius:"10px",
            background:"#fff",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-evenly"
    
        }}
        key={index}>

                <img src={item.imagenPaquete} style={{
                    border:"solid blue 3px ",
                    margin:"10px",
                    borderRadius:"10px",
                    width:"150px"
                }}>
              
                </img>

                <div style={{
                    border:"solid red 3px ",
                    margin:"0px 10px"
                }}>
                          <h2>{item.nombrePaquete}</h2>
                </div>

                <div style={{
                    border:"solid yellow 3px ",
                    margin:"5px 10px"
                }}>
                    <p>{item.descripcionPaquete}</p>
                </div>

                <Button 
                onClick={handleButtonClick}>
                     Ver
                </Button>

                <Button onClick={handleButtonClick}>
                    comprar
                </Button>

                </div>
      ))}
    
    </>
  )
}
