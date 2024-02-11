import reactImage from "../../assets/header.svg"
// import { Segmented, Progress } from 'antd';
// import { Column } from '@ant-design/charts';
import styled from 'styled-components';
// import { useState } from "react";

/* const StyledColumn = styled(Column)`
  canvas {
    height: 300px !important;
    width: 100% !important;
    //border: solid green 4px;

  }
`; */

export const ContainerPrincipal = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #353535;

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

const data = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 0,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];

//CHARTS  
const config = {
  data,
  xField: 'type',
  yField: 'sales',
  label: {
    position: 'top', // Cambiado de 'middle' a 'top'
    style: {
      fill: '#FFFFFF',
      opacity: 0.6,
    },
  },
  meta: {
    type: { alias: '类别' },
    sales: { alias: '销售额' },
  },
};

const [percent, setPercent] = useState(0);
    const increase = () => {
      setPercent((prevPercent) => {
        const newPercent = prevPercent + 10;
        if (newPercent > 100) {
          return 100;
        }
        return newPercent;
      });
    };
    const decline = () => {
      setPercent((prevPercent) => {
        const newPercent = prevPercent - 10;
        if (newPercent < 0) {
          return 0;
        }
        return newPercent;
      });
    }; 

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

      {/*   <StyledColumn
            {...config}
            onReady={(plot) => {
              plot.on('plot:click', (evt) => {
                const { x, y } = evt;
                const { xField } = plot.options;
                const tooltipData = plot.chart.getTooltipItems({ x, y });
                console.log(tooltipData);
              });
            }}
          /> */}

     {/*      <div style={{ 
                border: '3px solid green', 
                display: 'flex',
                flexDirection:'column',
                justifyContent: 'space-around',
                alignItems:'center',
                // height:'40vh',
                width:"300px",
              }}>

                  <div
                    style={{
                      marginBottom: 10,
                      display: 'flex',
                      flexDirection:'column',
                      justifyContent: 'space-around',
                      alignItems:'center',
                      border: '3px solid green', 
                    }}
                  >
                    <Progress percent={percent} />
                    <Progress type="circle" percent={percent} />
                  </div>
                  <Button.Group>
                    <Button onClick={decline} icon={<MinusOutlined />} />
                    <Button onClick={increase} icon={<PlusOutlined />} />
                  </Button.Group>

          </div> */}
        </ContainerPrincipal>
      </>
  );
  }
  
  
  