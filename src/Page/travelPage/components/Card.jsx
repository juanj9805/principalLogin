import { Button } from 'antd'
import React, { useEffect } from 'react'
import exampleImage from '../../../assets/cartagena.svg';

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
        border:"solid red 3px",
        borderRadius:"10px",
        background:"#fff",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly"

    }}>
                <img src={exampleImage} style={{
                    border:"solid blue 3px ",
                    margin:"10px",
                    borderRadius:"10px"
                }}>
              
                </img>

                <div style={{
                    border:"solid red 3px ",
                    margin:"0px 10px"
                }}>
                          <h2>Cartagena</h2>
                    {/* {ejemplo} */}
                </div>

                <div style={{
                    border:"solid yellow 3px ",
                    margin:"5px 10px"
                }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quod at animi id eligendi ad necessitatibus debitis odio deserunt incidunt, quibusdam enim impedit quisquam obcaecati, exercitationem ea voluptate, consequatur maiores?
                </div>

                {/* <div style={{
                    border:"solid green 3px "
                }}>
                    verde
                </div> */}

                <Button 
                onClick={handleButtonClick}>
                     Ver
                </Button>

                <Button onClick={handleButtonClick}>
                     Comprar
                </Button>

               
                

 
    
    
    </div>
  )
}
