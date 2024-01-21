import styled from "styled-components";
import reactImage from "../../assets/header.svg"

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

export const ReportPage = () => {
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

  </div>

</ContainerPrincipal>
      </>
  );
  }
  
  
  