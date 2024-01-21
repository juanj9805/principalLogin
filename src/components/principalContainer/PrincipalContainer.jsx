import styled from "styled-components";

const ContainerPrincipal = styled.div`
  width: 100%;
  height: 100vh;
  border: 4px dotted blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .imagen__banner {
    width: 100%;
    height: 20vh;
    border: 4px dotted yellow;
    background: url('../../assets/header.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    h1 {
      margin-left: 20px;
    }

    h4 {
      margin-left: 20px;
    }
  }

  .cuerpo__container {
    border: 4px dotted blue;
    width: 100%;
    height: 80vh;
  }
`;

export default ContainerPrincipal;
