import { Button } from 'antd'
import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
// import exampleImage from '../../../assets/cartagena.svg';

export default function Card({ejemplo, data}) {
    const handleButtonClick = () => {
        // alert(data.descripcionPaquete);
    }

        useEffect(() => {
            console.log(data);
            // console.log(data[0].descripcionPaquete);
            console.log("mira la data  ");
          }, [data]);
        
  return (
    <>
    {data.map((item, index) => (
        <div
        style={{
            width:"350px",
            height:"500px",
            // border:"solid green 13px",
            borderRadius:"10px",
            background:"#fff",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-evenly",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
            margin:"5px"
            
            
    
        }}
        key={index}>

                <img src={item.imagenPaquete} style={{
                    // border:"solid blue 3px ",
                    margin:"5px",
                    borderRadius:"10px",
                    width:"95%",
                    justifyContent:"center",
                }}>
              
                </img>

                <div style={{
                    // border:"solid red 3px ",
                    margin:"0px 10px"
                }}>
                          <h2>{item.nombrePaquete}</h2>
                </div>

                <div style={{
                    // border:"solid red 3px ",
                    margin:"0px 10px",
                    color: "#0C9999"
                }}>
                          <h2>{item.precioPaquete}</h2>
                </div>

                <div style={{
                    // border:"solid yellow 3px ",
                    margin:"5px 10px"
                }}>
                    <p>{item.descripcionPaquete}</p>
                </div>

                {/* <Button 
                onClick={handleButtonClick}>
                     Ver
                </Button> */}
              
              
              
                <Link to={"/sales/" + item.idPaquete } >

   
                    <Button 
                    style={{
                        backgroundColor:"#0C9999",
                        color:"white",
                        fontWeight:"bold",
                        // fontSize:"15px",

                    }}
                    onClick={handleButtonClick}>
                        comprar
                    </Button>

                </Link>

                </div>
      ))}
    
    </>
  )
}
