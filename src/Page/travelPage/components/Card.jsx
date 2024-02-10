import { Button } from 'antd'
import React, { useEffect } from 'react'

export default function Card({ejemplo, data}) {
    const handleButtonClick = () => {
        alert(data.descripcionPaquete);}

        useEffect(() => {
            console.log(data);
            console.log("mira el precio ");
            console.log(precioPaquete)
          }, [data]);


    const { idPaquete, nombrePaquete, descripcionPaquete, precioPaquete, destinoPaquete, fechaSalida, fechaRegreso } = data;
        
  return (
    <div
    style={{
        width:"400px",
        height:"500px",
        border:"solid red 3px"
    }}>Card
                <div style={{
                    border:"solid blue 3px "
                }}>
                    {ejemplo}
                </div>

                <div style={{
                    border:"solid red 3px "
                }}>
                    rojo:{idPaquete}
                </div>

                <div style={{
                    border:"solid yellow 3px "
                }}>
                     Amillo: { data.descripcionPaquete}
                </div>

                <div style={{
                    border:"solid green 3px "
                }}>
                    verde
                </div>

                <Button onClick={handleButtonClick}>
        prueba
      </Button>

               
                

 
    
    
    </div>
  )
}
